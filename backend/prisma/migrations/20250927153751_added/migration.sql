-- CreateTable
CREATE TABLE "public"."Passwordreset" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Passwordreset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passwordreset_userId_key" ON "public"."Passwordreset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Passwordreset_token_key" ON "public"."Passwordreset"("token");

-- AddForeignKey
ALTER TABLE "public"."Passwordreset" ADD CONSTRAINT "Passwordreset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
