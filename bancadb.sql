create table cliente (
id int AUTOINCREMENT,
Run varchar(11) not NULL,
nombre varchar(20) not NULL,
apellido varchar(20) not NULL,
fecha_nacimiento Date not NULL);

create table cuenta (
id_cliente int not NULL,
numero int not null,
saldo int not null,
tipo varchar(10) not null,
FOREIGN KEY id_cliente REFERENCES cliente(id) on update cascade on delete cascade);

create table gerente (
correo varchar(20) not null,
nombre varchar(20) not null,
apellido varchar(20) not null,
password int not null);

create view datos_general AS
select c.run, c.nombre, c.apellido, t.tipo, t.saldo
from cliente c, cuenta t
where c.id = t.id_cliente;

