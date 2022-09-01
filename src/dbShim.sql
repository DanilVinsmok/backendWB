CREATE TABLE brands(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) ,--уникальная каллонка index(почитать)
    apiKeyOne VARCHAR(150),
    apiKeyTwo VARCHAR(180),
    expirationDate TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE orders(
    gNumber	VARCHAR(50),
    date TIMESTAMP WITH TIME ZONE ,
    lastChangeDate	TIMESTAMP WITH TIME ZONE,
    supplierArticle	VARCHAR(75),
    techSize VARCHAR(30),
    barcode	VARCHAR(30),
    totalPrice REAL,	
    discountPercent	INTEGER,
    warehouseName VARCHAR(50),
    oblast VARCHAR(200),
    incomeID VARCHAR(30),	
    odid VARCHAR(30) PRIMARY KEY,
    nmid VARCHAR(30),
    subject	VARCHAR(50),
    category VARCHAR(50),
    brand VARCHAR(50),
    is_cancel BOOLEAN,
    sticker	VARCHAR(50),
    idBrand INTEGER,
    FOREIGN KEY (idBrand) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE dictionaryProducts(
    productСategory VARCHAR(50),
    productSubcategory VARCHAR(50),
    product VARCHAR(50),
    articleNumber VARCHAR(30),
    nmid VARCHAR(30) PRIMARY KEY,
);

CREATE TABLE warehouse (
    id SERIAL PRIMARY KEY,
    lastChangeDate TIMESTAMP WITH TIME ZONE,
    supplierArticle VARCHAR(75),
    techSize VARCHAR(30),
    barcode VARCHAR(30),
    quantity INTEGER,
    isSupply BOOLEAN,
    isRealization BOOLEAN,
    quantityFull INTEGER,
    quantityNotInOrders INTEGER,
    warehouse VARCHAR(30),
    warehouseName VARCHAR(50),
    inWayToClient INTEGER,
    inWayFromClient INTEGER,
    nmId INTEGER,
    subject VARCHAR(50),
    category VARCHAR(50),
    daysOnSite INTEGER,
    brand VARCHAR(50),
    SCCode VARCHAR(50),
    Price REAL,
    Discount INTEGER,
    idBrand INTEGER
);