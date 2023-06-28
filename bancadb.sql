create table cliente (
    id serial primary key,
    Run varchar(11) not null,
    nombre varchar(20) not NULL,
    apellido varchar(20) not NULL,
    fecha_nacimiento Date not NULL
);

create table cuenta (
    id_cliente int not NULL,
    numero varchar(16) not null,
    saldo int not null,
    tipo varchar(10) not null,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) on update cascade on delete cascade
);

create table gerente (
    correo varchar(50) not null,
    nombre varchar(20) not null,
    apellido varchar(20) not null,
    password varchar(100) not null,
    primary key (correo)
);

/* Para la información general de la tabla */
create view datos_general AS
select
    c.id,
    c.run,
    c.nombre,
    c.apellido,
    t.numero,
    t.saldo
from
    cliente c,
    cuenta t
where
    c.id = t.id_cliente;

/* Para la información adicional al mostrar un cliente especifico */
create view datos_adicionales AS
select
    c.id,
    c.fecha_nacimiento,
    t.tipo
from
    cliente c,
    cuenta t
where
    c.id = t.id_cliente;

/* 
 VISTA CON TODOS LOS DATOS
 */
create view clients_data AS
select
    c.id,
    c.run,
    c.nombre,
    c.apellido,
    to_char (c.fecha_nacimiento, 'YYYY-MM-DD') as fecha_nacimiento,
    date_part('year', CURRENT_DATE) - date_part('year', c.fecha_nacimiento) as edad,
    t.numero,
    t.saldo,
    t.tipo
from
    cliente c,
    cuenta t
where
    c.id = t.id_cliente;

/*
 DATOS FICTICIOS DE CLIENTES
 */
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

/*
 DATOS FICTICIOS DE CUENTAS
 */
INSERT INTO
    cuenta (id_cliente, numero, saldo, tipo)
VALUES
    (1, '000-321-000-001', 50000, 'Ahorro'),
    (2, '000-321-000-002', 75000, 'Ahorro'),
    (3, '000-321-000-003', 100000, 'Ahorro'),
    (4, '000-321-000-004', 25000, 'Ahorro'),
    (5, '000-321-000-005', 80000, 'Ahorro'),
    (6, '000-321-000-006', 120000, 'Ahorro'),
    (7, '111-321-000-001', 40000, 'Vista'),
    (8, '111-321-000-002', 90000, 'Vista'),
    (9, '111-321-000-003', 55000, 'Vista'),
    (10, '111-432-000-004', 85000, 'Vista'),
    (11, '111-432-000-005', 70000, 'Vista'),
    (12, '111-432-000-006', 50000, 'Vista'),
    (13, '222-432-000-001', 60000, 'Corriente'),
    (14, '222-432-000-002', 110000, 'Corriente'),
    (15, '222-432-000-003', 45000, 'Corriente'),
    (16, '222-432-000-004', 75000, 'Corriente'),
    (17, '222-432-000-005', 60000, 'Corriente'),
    (18, '222-432-000-006', 40000, 'Corriente'),
    (19, '222-432-000-007', 10000, 'Corriente'),
    (20, '222-432-000-008', 85000, 'Corriente');

INSERT INTO
    gerente (correo, nombre, apellido, password)
VALUES
    (
        'gerencia@bancarota.cl',
        'Cesar',
        'Díaz',
        '$2b$10$VGmsnepPXARjBlXwUESBre5LNdDRMbKZ.AQOahFPBWbdTx2.Q8BMO'
    );