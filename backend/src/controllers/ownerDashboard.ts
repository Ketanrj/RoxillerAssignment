import { Request, Response } from "express";
import { prismaClient } from "..";

export const ownerDashboard = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?.id; 

    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const store = await prismaClient.store.findFirst({
      where: { ownerId },
      select: {
        id: true,
        name: true,
        ratings: {
          select: {
            rating: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const totalRatings = store.ratings.length;
    const avgRating =
      totalRatings > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : null;

    return res.json({
      storeId: store.id,
      storeName: store.name,
      averageRating: avgRating,
      users: store.ratings.map((r) => ({
        userId: r.user.id,
        name: r.user.name,
        email: r.user.email,
        rating: r.rating,
      })),
    });
  } catch (error) {
    console.error("Error fetching owner dashboard:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
