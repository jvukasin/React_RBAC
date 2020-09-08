insert into role values (1, 'ROLE_SELLER'), (2, 'ROLE_ADMIN'), (3, 'ROLE_PROCURER');

insert into article values (1, 'Sony', '013525', 'Sony Bravia LCD TV', 550),
(2, 'Sony', '235013', 'Sony Alpha p50', 630),
(3, 'Sony', '682057', 'Sony Boombox bluethooth speaker', 290.5),
(4, 'IPhone', '263568', 'IPhone X Pro', 900),
(5, 'Samsung', '263809', 'Samsung Galaxy s20', 980),
(6, 'JBL', '098534', 'JBL In ear headset', 67),
(7, 'GoPro', '125467', 'GoPro Hero 8 Black', 560),
(8, 'Nikon', '253890', 'Nikon D3200', 397),
(9, 'Canon', '250493', 'Canon EOS 3D', 440),
(10, 'HP', '101094', 'HP Pavilion laptop DH-320', 608);

insert into inventory values (1, 9, 1),
(2, 11, 2),
(3, 20, 3),
(4, 48, 4),
(5, 50, 5),
(6, 66, 6),
(7, 54, 7),
(8, 15, 8),
(9, 19, 9),
(10, 3, 10);

insert into user (type, username, email, first_name, last_name, password, worker_code) values
('Seller','seller', 'petarperic@gmail.com', 'Petar', 'Peric', '$2a$10$mpBx/eYSXYSrK1pZnQxB1.QYGEFsz3msbjeAcuhwBfGVyShq5mtKy', 'Sx832'),
('Procurer','procurer', 'milanmilic@gmail.com', 'Milan', 'Milic', '$2a$10$Lr4iuq.HYXCPrUVg/4L.pOJcZ3vAPWMmpnmgTL/mepRHn/d/is0gO', 'Px401'),
('Procurer','manager', 'lazaar@gmail.com', 'Lazar', 'Lazic', '$2a$10$G2a1Chhusk0zGfOSiZp0P.WcuS3F539lwW0olswgaj4Zh9MsBjp2m', 'Mx669'),
('Admin','admin', 'jovic.vukasin@gmail.com', 'Vukasin', 'Jovic', '$2a$10$YGsJD7yJCTUvp9H.pUBWXON3mHDvy.mpzDhs9HSHtjv0qeCsJXAyC', 'Axh55');

insert into user_roles values ('seller', 1), ('admin', 2), ('procurer', 3), ('manager',1), ('manager',3);

insert into react_pages (id, component, icon, title, url, child) values
(1, 'Inventory', 'pe-7s-graph', 'Inventory', '/', false),
(2, 'Procurement', 'pe-7s-note2', 'Procurement', '/procurement', false),
(3, 'Employees', 'pe-7s-note2', 'Employees', '/employees', true),
(4, 'Profile', 'pe-7s-note2', 'Profile', '/profile', false),
(5, 'Articles', 'pe-7s-note2', 'Articles', '/articles', true),
(6, 'Admin', 'pe-7s-note2', 'Admin', '/admin', false);

insert into react_actions (id, action, url, page) values
(1, 'Display stats', 'system-stats', 'Inventory'),
(2, 'Edit Inventory Item', 'edit-inventory', 'Inventory'),
(3, 'Create Procurement', 'create-procurement', 'Procurement'),
(4, 'Add Employee', 'add-employee', 'Employees'),
(5, 'Complete Procurement', 'complete-procurement', 'Procurement'),
(6, 'Add Article', 'add-article', 'Articles'),
(7, 'Show My Procurements', 'my-procurements', 'Profile');


insert into roles_pages values (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (1, 1), (1, 2), (1, 4), (3, 1), (3, 2), (3, 4);
insert into roles_actions values (2, 1), (2, 2), (2, 4), (2, 6), (1, 3), (1, 7), (3, 5), (3, 7);
insert into parent_child_pages values (6, 3), (6, 5);

