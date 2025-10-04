import { Request, Response } from "express";
import { hashSync } from "bcrypt";
import { prismaClient } from "../app";


export const newuser = async (req: Request, res: Response) => {
  const { name, email, address, password, role } = req.body;

  let user = await prismaClient.user.findFirst(({ where: { email: email } }))
  if (user) {
    throw new Error("User Already Exist");
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      address,
      role,
      password: hashSync(password, 8)
    },
  })

  res.json({ user });
}

export const usersCount = async (req: Request, res: Response) => {
  try {
    const adminUsers = await prismaClient.user.count({ where: { role: 'ADMIN' } })
    const NormalUsers = await prismaClient.user.count({ where: { role: 'NORMAL_USER' } })
    if (NormalUsers == 0) {
      res.status(404).send("No Normal User Does not Exists")
    }
    const StoreOwners = await prismaClient.user.count({ where: { role: 'STORE_OWNER' } })
    if (!StoreOwners) {
      res.status(404).send("Store Owner Does not Exists")
    }

    return res.json({ adminUsers, NormalUsers, StoreOwners })
  } catch (error) {
    console.error("Error fetching users count:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const userList = async (req: Request, res: Response) => {
  try {
    const { name, email, address, role, page = '1', limit = '10' } = req.query;

    // Convert pagination params
    const pageNum = Math.max(1, parseInt(String(page)));
    const limitNum = Math.min(100, Math.max(1, parseInt(String(limit)))); // Cap at 100
    const skip = (pageNum - 1) * limitNum;

    // Build where clause more cleanly
    const whereClause: any = {};

    if (name) {
      whereClause.name = { contains: String(name), mode: "insensitive" };
    }

    if (email) {
      whereClause.email = { contains: String(email), mode: "insensitive" };
    }

    if (address) {
      whereClause.address = { contains: String(address), mode: "insensitive" };
    }

    if (role) {
      whereClause.role = String(role) as any;
    }

    // Get total count for pagination
    const totalUsers = await prismaClient.user.count({ where: whereClause });

    const users = await prismaClient.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true, // Usually helpful to include
        ratings: role === "STORE_OWNER" ? {
          select: {
            id: true,
            rating: true,
            createdAt: true
          }
        } : false,
      },
      orderBy: { createdAt: 'desc' }, // Most recent first
      skip,
      take: limitNum,
    });

    // Return empty array instead of 404 for better API design
    const response = {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limitNum),
        hasNext: pageNum < Math.ceil(totalUsers / limitNum),
        hasPrev: pageNum > 1
      }
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


export const ownerList = async (req: Request, res: Response) => {
  try {
    const storeOwnerList = await prismaClient.user.findMany({
      where: {
        role: 'STORE_OWNER'
      },
    })
    if (!storeOwnerList) {
      return res.status(404).json({ message: 'No Store Owner Exist' });
    }

    const ownerList = storeOwnerList.map((details) => (
      {
        id: details.id,
        name: details.name,
      }
    ))

    return res.status(200).json({ ownerList })
  } catch (error) {
    console.error("Error Owner List:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}
