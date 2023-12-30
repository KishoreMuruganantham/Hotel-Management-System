create database hotel;

use hotel;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
); 

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  country VARCHAR(255),
  img VARCHAR(255),
  city VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    distance VARCHAR(255) NOT NULL,
    photos JSON,
    title VARCHAR(255) NOT NULL,
    `desc` TEXT NOT NULL,
    rating DECIMAL(3, 1) CHECK (rating >= 0 AND rating <= 5),
    cheapestPrice DECIMAL(10, 2) NOT NULL,
    featured TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Assuming hotel with id = 1
INSERT INTO `hotels` (`id`, `name`, `type`, `city`, `address`, `distance`, `photos`, `title`, `desc`, `rating`, `cheapestPrice`, `featured`, `created_at`, `updated_at`)
VALUES ('1001', 'Raj Hotels', 'hotel', 'Chennai', 'Mahatma Gandhi road, Anna Salai', '14 km', '["https://cf.bstatic.com/xdata/images/hotel/max1024x768/4921789.jpg?k=4e970e0a0c1afe1aca9380d78938cddc753c2263e175c70009a4b1782774f314&o=&hp=1"]', 'Raj Mahal ', 'A luxury hotel in the heart of Chennai', '4.9', '10000', '1', NOW(), NOW());

-- Assuming hotel with id = 2
INSERT INTO `hotels` (`id`, `name`, `type`, `city`, `address`, `distance`, `photos`, `title`, `desc`, `rating`, `cheapestPrice`, `featured`, `created_at`, `updated_at`)
VALUES ('1002', 'Lux House', 'apartment', 'Mumbai', 'Linking road', '9 km', '["https://www.rathbonehotel.co.uk/app/uploads/fly-images/945/Rathbone-Hotel-Studio-Suite1-1730x730-c.jpg"]', 'Lux House Hotel', 'Luxury at home', '4.3', '8500', '0', NOW(), NOW());

-- Assuming hotel with id = 3
INSERT INTO `hotels` (`id`, `name`, `type`, `city`, `address`, `distance`, `photos`, `title`, `desc`, `rating`, `cheapestPrice`, `featured`, `created_at`, `updated_at`)
VALUES ('1003', 'The Belljar Inn', 'resort', 'New York', 'West village', '15 km', '["https://img.traveltriangle.com/blog/wp-content/uploads/2018/11/3-Star-Hotels-In-Deira-Dubai.jpg"]', 'Belljar Hotel', 'A cozy bed and breakfast in the heart of New York', '3.7', '5600', '1', NOW(), NOW());

-- Assuming hotel with id = 4
INSERT INTO `hotels` (`id`, `name`, `type`, `city`, `address`, `distance`, `photos`, `title`, `desc`, `rating`, `cheapestPrice`, `featured`, `created_at`, `updated_at`)
VALUES ('1004', 'Rose Gardens', 'villa', 'London', 'Bond street', '4 km', '["https://hips.hearstapps.com/hmg-prod/images/london-hotels-with-a-view-646c859604f1c.jpg?resize=2048:*"]', 'Rose Gardens Hotel', 'The best London Hotel for a staycation', '4.6', '15000', '0', NOW(), NOW());

-- Assuming hotel with id = 5
INSERT INTO `hotels` (`id`, `name`, `type`, `city`, `address`, `distance`, `photos`, `title`, `desc`, `rating`, `cheapestPrice`, `featured`, `created_at`, `updated_at`)
VALUES ('1005', 'Maddy\'s Inn', 'cabin', 'Toronto', 'Bay street', '7.5 km', '["https://images.luxuryhotel.guru/hotelimage.php?p_id=1&code=47c2759e372bf1c6295c57af7cd66566&webpage=bed-and-breakfast.me&link=https%3A%2F%2Fsubdomain.cloudimg.io%2Fcrop%2F512x384%2Fq70.fcontrast10.fbright0.fsharp5%2Fhttps%3A%2F%2Fq-xx.bstatic.com%2Fxdata%2Fimages%2Fhotel%2Fmax1536%2F95275384.jpg%3Fk%3Def07f13aa872c9f525b26d60fa1186547abf05820d3fc47a843118c1089cae1e%26o%3D"]', 'Maddy\'s Inn', 'A bed and breakfast Inn for the comfort lovers', '3.9', '2300', '1', NOW(), NOW());

select * from hotels;

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_id INT,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    maxPeople INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- Assuming room with id = 1 is associated with hotel_id = 1
INSERT INTO `rooms` (`id`, `hotel_id`, `title`, `price`, `maxPeople`, `description`, `created_at`, `updated_at`)
VALUES (1, 1001, 'Single Room', 100.00, 1, 'A spacious room for lonely', NOW(), NOW());

-- Assuming room with id = 2 is associated with hotel_id = 1
INSERT INTO `rooms` (`id`, `hotel_id`, `title`, `price`, `maxPeople`, `description`, `created_at`, `updated_at`)
VALUES (2, 1001, 'Deluxe Room', 150.00, 2, 'A spacious and comfortable room', NOW(), NOW());

-- Assuming room with id = 3 is associated with hotel_id = 1
INSERT INTO `rooms` (`id`, `hotel_id`, `title`, `price`, `maxPeople`, `description`, `created_at`, `updated_at`)
VALUES (3, 1001, 'Economical Room', 75.00, 1, 'A perfect room', NOW(), NOW());

select * from rooms;

CREATE TABLE roomNumbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id INT,
    number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);


CREATE TABLE unavailableDates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomNumber_id INT,
    date DATE,
    user_id INT,
    FOREIGN KEY (roomNumber_id) REFERENCES roomNumbers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO roomNumbers (room_id, number)
VALUES
    (1, 1),
    (1, 3),
    (2, 102),
    (2, 103),
    (3, 200),
    (3, 201);

INSERT INTO unavailableDates (roomNumber_id, date, user_id)
VALUES
    (1, '2023-11-28', 1), -- Reserved on 2023-11-28 by user 1
    (1, '2023-11-29', 2), -- Reserved on 2023-11-29 by user 2
    (2, '2023-11-10', 3);