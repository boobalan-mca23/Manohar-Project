-- CreateTable
CREATE TABLE `restors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restore_number` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `restors_restore_number_key`(`restore_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restoreItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restore_number` VARCHAR(191) NOT NULL,
    `product_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `restoreItems` ADD CONSTRAINT `restoreItems_restore_number_fkey` FOREIGN KEY (`restore_number`) REFERENCES `restors`(`restore_number`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restoreItems` ADD CONSTRAINT `restoreItems_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product_info`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
