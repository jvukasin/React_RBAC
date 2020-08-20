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
('Seller','pera', 'petarperic@gmail.com', 'Petar', 'Peric', '$2a$10$vpG.tlnSZyqbUYQZpVelne/pbH5Yphrmvy1XbdH8VmgR7T335z0RG', 'Ox832'),
('Admin','vule', 'jovic.vukasin@gmail.com', 'Vukasin', 'Jovic', '$2a$10$7pbEvp9b8NVOz/K/oVKOx.OG24I3hJA7BfWy7FjND96zhaVKxlDhG', '31h55');

insert into user_roles values ('vule', 2), ('pera', 1);

insert into react_pages (id, component, icon, title, url) values
(1, 'Inventory', 'pe-7s-graph', 'Inventory', '/'),
(2, 'Procurement', 'pe-7s-note2', 'Procurement', '/procurement'),
(3, 'Employees', 'pe-7s-note2', 'Employees', '/employees');

insert into react_actions (id, action, url, page) values
(1, 'Create Role', 'create-role', 'Inventory'),
(2, 'Delete Role', 'delete-role', 'Inventory'),
(3, 'Create Procurement', 'create-procurement', 'Procurement'),
(4, 'Add Employee', 'add-employee', 'Employees');

insert into roles_pages values (2, 1),(2, 2),(2, 3),(1, 1),(1, 2);
insert into roles_actions values (2, 1),(2, 2),(2, 4), (1, 3);

