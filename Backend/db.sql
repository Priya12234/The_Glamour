CREATE TABLE Users (
    userid SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    number VARCHAR(15) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE Appointments (
    appointmentid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES Users(userid) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    service VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL
);

CREATE TABLE Products (
    productid SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_weight VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    product_image TEXT NOT NULL
);

CREATE TABLE Orders (
    orderid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES Users(userid) ON DELETE CASCADE,
    productid INTEGER REFERENCES Products(productid) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    number VARCHAR(15) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER CHECK (quantity > 0) NOT NULL,
    total DECIMAL(10,2) CHECK (total >= 0) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' NOT NULL
);

CREATE TABLE Services (
    serviceid SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_price DECIMAL(10,2) NOT NULL,
    service_description TEXT NOT NULL,
    service_image TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Active' NOT NULL
);

CREATE TABLE Feedback (
    feedbackid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES Users(userid) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    time TIME NOT NULL DEFAULT CURRENT_TIME,
    status VARCHAR(50) DEFAULT 'Hidden' NOT NULL
);

INSERT INTO Users (email, name, number, password) VALUES
('pchauhan862@rku.ac.in', 'Priya Chauhan', '9999999999', 'Priya@123'),
('anita.verma@yahoo.com', 'Anita Verma', '9765432101', 'Anita@123'),
('riya.kapoor@outlook.com', 'Riya Kapoor', '9898765432', 'Riya@123'),
('sunita.patel@rediffmail.com', 'Sunita Patel', '9543216789', 'Sunita@123'),
('shreya.kumar@hotmail.com', 'Shreya Kumar', '9998887776', 'Shreya@123');

-- Insert Appointments (Salon Service Bookings)
INSERT INTO Appointments (userid, name, service, date, time) VALUES
(1, 'Meera Sharma', 'Bridal Makeup', '2025-04-01', '10:30:00'),
(2, 'Anita Verma', 'Hair Spa', '2025-04-02', '12:00:00'),
(3, 'Riya Kapoor', 'Full Body Massage', '2025-04-03', '15:00:00'),
(4, 'Sunita Patel', 'Manicure & Pedicure', '2025-04-04', '11:00:00'),
(5, 'Shreya Kumar', 'Facial', '2025-04-05', '14:30:00');

-- Insert Products (Salon Beauty & Grooming Products)
INSERT INTO Products (product_name, product_weight, price, product_image) VALUES
('L’Oreal Hair Serum', '100ml', 799.00, 'https://example.com/loreal_serum.jpg'),
('Lakme Foundation', '50ml', 499.00, 'https://example.com/lakme_foundation.jpg'),
('Nykaa Nail Polish', '10ml', 199.00, 'https://example.com/nykaa_nailpolish.jpg'),
('Biotique Face Pack', '150g', 350.00, 'https://example.com/biotique_facepack.jpg'),
('Dove Shampoo', '650ml', 599.00, 'https://example.com/dove_shampoo.jpg');

-- Insert Orders (Customers Buying Salon Products)
INSERT INTO Orders (userid, productid, name, number, product_name, quantity, total, status) VALUES
(1, 1, 'Meera Sharma', '9876543210', 'L’Oreal Hair Serum', 1, 799.00, 'Delivered'),
(2, 2, 'Anita Verma', '9765432101', 'Lakme Foundation', 2, 998.00, 'Pending'),
(3, 3, 'Riya Kapoor', '9898765432', 'Nykaa Nail Polish', 3, 597.00, 'Shipped'),
(4, 4, 'Sunita Patel', '9543216789', 'Biotique Face Pack', 1, 350.00, 'Processing'),
(5, 5, 'Shreya Kumar', '9998887776', 'Dove Shampoo', 2, 1198.00, 'Cancelled');

-- Insert Services (Salon Services & Prices)
INSERT INTO Services (service_name, service_price, service_description, service_image, status) VALUES
('Bridal Makeup', 15000.00, 'Complete bridal makeup package with professional touch.', 'https://example.com/bridal_makeup.jpg', 'Active'),
('Hair Spa', 1200.00, 'Deep conditioning hair spa for smooth and shiny hair.', 'https://example.com/hair_spa.jpg', 'Active'),
('Full Body Massage', 3000.00, 'Relaxing full-body massage to relieve stress and tension.', 'https://example.com/body_massage.jpg', 'Active'),
('Manicure & Pedicure', 1800.00, 'Hand and foot care treatment for a polished look.', 'https://example.com/manicure_pedicure.jpg', 'Active'),
('Facial', 2000.00, 'Skin rejuvenation facial for a glowing complexion.', 'https://example.com/facial.jpg', 'Active');

-- Insert Feedback (Customer Reviews for Services)
INSERT INTO Feedback (userid, date, time, status) VALUES
(1, '2025-03-20', '10:15:00', 'Displayed'),
(2, '2025-03-21', '12:45:00', 'Hidden'),
(3, '2025-03-22', '15:30:00', 'Displayed'),
(4, '2025-03-23', '11:00:00', 'Displayed'),
(5, '2025-03-24', '14:30:00', 'Hidden');