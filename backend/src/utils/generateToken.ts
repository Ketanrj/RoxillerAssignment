import { createHash, randomBytes } from "crypto"


export const generateResetToken = () => {
    const resetToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const token = createHash("sha256").update(resetToken).digest("hex");

    
    return { token, expiresAt }
}