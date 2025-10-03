import { Request, Response } from "express";
import { prismaClient } from "..";


export const ratingCount = async (req: Request, res: Response) => {
    try {
        const rating = await prismaClient.rating.count();
        if (rating == 0) {
            return res.status(404).send("No Ratings Exists")
        }
        return res.json(rating);

    } catch (error) {
        console.error("Error fetching rating count:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const newRating = async (req: Request, res: Response) => {
    try {
        const userId: string = req.user?.id!;
        const { storeId, newrating } = req.body;

        if (!storeId || !newrating) {
            return res.status(400).json({ message: "storeId and rating are required" });
        }

        let store = await prismaClient.store.findFirst({ where: { id: storeId } });

        if (!store) {
            return res.status(404).send('Store not found');
        }

        const newOrUpdatedRating = await prismaClient.rating.upsert({
            where: {
                userId_storeId: {
                    userId,
                    storeId,
                },
            },
            update: {
                rating: newrating,
                updatedAt: new Date(),
            },
            create: {
                userId,
                storeId,
                rating: newrating,
            },
        });

        return res.status(200).json({
            message: "Rating submitted successfully",
            rating: newOrUpdatedRating,
        });
    } catch (error) {
        console.error("Error fetching rating count:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const storerating = async (req: Request, res: Response) => {
    const user = req?.user;

    const store = await prismaClient.store.findFirst


}

