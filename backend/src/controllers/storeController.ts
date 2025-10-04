import { Request, Response } from "express";
import { prismaClient } from "../app";

export const createStore = async (req: Request, res: Response) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await prismaClient.user.findUnique({
      where: { id: ownerId },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    if (owner?.role == 'NORMAL_USER' || owner?.role == 'ADMIN') {
      return res.status(400).json({ message: "Only Store Owner can create Store" });
    }

    const store = await prismaClient.store.create({
      data: {
        name,
        email,
        address,
        ownerId,
      },
    });

    return res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error: any) {
    console.error("Error creating store:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const storeList = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { name, email, address, sortBy, order } = req.query;

    const sortField = sortBy ? String(sortBy) : "name";
    const sortOrder: "asc" | "desc" = order === "desc" ? "desc" : "asc";

    const stores = await prismaClient.store.findMany({
      where: {
        name: name ? { contains: String(name), mode: "insensitive" } : undefined,
        email: email ? { contains: String(email), mode: "insensitive" } : undefined,
        address: address ? { contains: String(address), mode: "insensitive" } : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        owner: {
          select: { id: true, name: true }
        },
        ratings: {
          select: { user: true,
            rating: true
          }
        },
      },
        orderBy: { [sortField]: sortOrder },
      });

    if (stores.length === 0) {
      return res.status(404).send("No stores to display");
    }

    const responseStore = stores.map((store) => {
      const totalRatings = store.ratings.length;
      const averageRating =
        totalRatings > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
          : 0;

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        ownerId: store.owner.id,
        ownerName: store.owner.name,
        totalRatings,
        averageRating: Number(averageRating.toFixed(2)), // rounding
      };
    });

    res.json(responseStore);
  } catch (error) {
    console.error("Error fetching stores:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const storeCount = async (req: Request, res: Response) => {
  try {
    const store = await prismaClient.store.count();
    if (store == 0) {
      return res.status(404).send("No Store Exists")
    }
    return res.json(store);

  } catch (error) {
    console.error("Error fetching store count:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}