CREATE DATABASE IF NOT EXISTS storeapp;

USE storeapp;

CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    img VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

INSERT INTO products (name, brand, description, price, img, created_at, updated_at) VALUES
("Placa de Video RX 7600 GAMING OC 8G AMD Radeon Gigabyte", "AMD", "Placa de Video", 1899.99, 
"https://images.kabum.com.br/produtos/fotos/475647/placa-de-video-rx-7600-gaming-oc-8g-radeon-gigabyte-8gb-gddr6-128bits-rgb-gv-r76gaming-oc-8gd_1698435450_gg.jpg",
"2024-07-03 16:21:11", "2024-07-03 16:21:11"),
("Placa de Video RTX 4060 TI Ventus 2X Black 8G OC MSI NVIDIA GeForce", "NVIDIA", "Placa de Video", 2649.99, 
"https://images.kabum.com.br/produtos/fotos/473206/placa-de-video-rtx-4060-ti-ventus-2x-black-8g-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing-g-sync-_1691522292_gg.jpg",
"2024-07-03 21:24:55", "2024-07-03 21:24:55"),
("Processador AMD Ryzen 7 5700X3D, 3.6 GHz, (4.1GHz Max Turbo)", "AMD", "Processador", 1399.99,
"https://images.kabum.com.br/produtos/fotos/520369/processador-amd-ryzen-7-5700x3d-3-6-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-video-integrado-100-100001503wof_1708023990_gg.jpg",
"2024-07-03 21:25:35", "2024-07-03 21:25:35"),
("Processador Intel Core i7-12700K, 3.6GHz (5.0GHz Max Turbo)", "Intel", "Processador", 2109.99, 
"https://images.kabum.com.br/produtos/fotos/241048/processador-intel-core-i7-12700k-cache-25mb-3-6ghz-5-0ghz-max-turbo-lga-1700-bx8071512700k_1634830258_gg.jpg",
"2024-07-03 21:25:59", "2024-07-03 21:25:59"),
("Monitor Gamer LG UltraGear 32, 165Hz, QHD, 1ms", "LG", "Monitor", 1599.99,
"https://images.kabum.com.br/produtos/fotos/364835/monitor-gamer-lg-ultragear-32-led-165-hz-qhd-1ms-hdmi-displayport-95-srgb-freesync-premium-hdr-10-vesa-preto-32gn600-b_1715801726_gg.jpg",
"2024-07-03 21:26:34", "2024-07-03 21:26:34"),
("Mouse Gamer Logitech G203 LIGHTSYNC RGB", "Logitech", "Mouse", 139.90,
"https://images.kabum.com.br/produtos/fotos/112948/mouse-gamer-logitech-g203-rgb-lightsync-6-botoes-8000-dpi-preto-910-005793_1612880277_gg.jpg",
"2024-07-03 21:26:34", "2024-07-03 21:26:34"),
("Headset Cloud Revolver", "HyperX", "Headset", 999.99,
"https://images.kabum.com.br/produtos/fotos/143090/headset-gamer-hyperx-cloud-revolver-hhsr1-ah-gm-g_1611586058_gg.jpg",
"2024-07-03 21:26:59", "2024-07-03 21:26:59"),
("Headset Cloud Stinger", "HyperX", "Headset", 599.99,
"https://images.kabum.com.br/produtos/fotos/81132/81132_index_g.jpg",
"2024-07-03 21:27:17", "2024-07-03 21:27:17");