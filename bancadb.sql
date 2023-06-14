create table cliente (
    id serial primary key,
    Run varchar(11) not null,
    nombre varchar(20) not NULL,
    apellido varchar(20) not NULL,
    fecha_nacimiento Date not NULL
);

create table cuenta (
    id_cliente int not NULL,
    numero varchar(12) not null,
    saldo int not null,
    tipo varchar(10) not null,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) on update cascade on delete cascade
);

create table gerente (
    correo varchar(20) not null,
    nombre varchar(20) not null,
    apellido varchar(20) not null,
    password int not null
);

create view datos_general AS
select
    c.run,
    c.nombre,
    c.apellido,
    t.tipo,
    t.saldo
from
    cliente c,
    cuenta t
where
    c.id = t.id_cliente;

INSERT INTO
    cliente (Run, nombre, apellido, fecha_nacimiento)
VALUES
    ('11111111-1', 'Juan', 'Pérez', '1990-01-01'),
    ('22222222-2', 'María', 'López', '1985-03-15'),
    ('33333333-3', 'Pedro', 'González', '1998-07-20'),
    ('44444444-4', 'Ana', 'Rodríguez', '1992-11-10'),
    ('55555555-5', 'Diego', 'Silva', '1987-06-25'),
    ('66666666-6', 'Carla', 'Hernández', '1995-02-18'),
    ('77777777-7', 'Andrés', 'Torres', '1984-09-05'),
    ('88888888-8', 'Laura', 'Gutiérrez', '1999-04-30'),
    ('99999999-9', 'Felipe', 'Vargas', '1993-12-12'),
    ('10101010-0', 'Camila', 'Rojas', '1996-08-22'),
    ('12121212-1', 'Javier', 'Lira', '1989-05-07'),
    (
        '13131313-2',
        'Valentina',
        'Molina',
        '1991-10-03'
    ),
    ('14141414-3', 'Ricardo', 'Soto', '1986-04-16'),
    ('15151515-4', 'Isabel', 'Navarro', '1997-09-28'),
    ('16161616-5', 'Gonzalo', 'Araya', '1988-03-09'),
    ('17171717-6', 'Paula', 'Pizarro', '1994-07-14'),
    ('18181818-7', 'Sergio', 'Ortega', '1992-12-08'),
    ('19191919-8', 'Fernanda', 'López', '1985-06-20'),
    ('20202020-9', 'Matías', 'González', '1998-01-05'),
    ('21212121-0', 'Valeria', 'Muñoz', '1993-04-25');

INSERT INTO
    cuenta (id_cliente, numero, saldo, tipo)
VALUES
    (1, '000000001', 50000, 'Ahorro'),
    (2, '000000002', 75000, 'Ahorro'),
    (3, '000000003', 100000, 'Ahorro'),
    (4, '000000004', 25000, 'Ahorro'),
    (5, '000000005', 80000, 'Ahorro'),
    (6, '000000006', 120000, 'Ahorro'),
    (7, '111000001', 40000, 'Vista'),
    (8, '111000002', 90000, 'Vista'),
    (9, '111000003', 55000, 'Vista'),
    (10, '111000004', 85000, 'Vista'),
    (11, '111000005', 70000, 'Vista'),
    (12, '111000006', 50000, 'Vista'),
    (13, '222000001', 60000, 'Corriente'),
    (14, '222000002', 110000, 'Corriente'),
    (15, '222000003', 45000, 'Corriente'),
    (16, '222000004', 75000, 'Corriente'),
    (17, '222000005', 60000, 'Corriente'),
    (18, '222000006', 40000, 'Corriente'),
    (19, '222000007', 10000, 'Corriente'),
    (20, '222000008', 85000, 'Corriente');