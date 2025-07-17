-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "shortCode" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
