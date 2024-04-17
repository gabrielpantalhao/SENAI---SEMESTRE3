create database vendas;
use vendas;

CREATE TABLE IF NOT EXISTS tbl_produtos(
    id INT NOT NULL AUTO_INCREMENT,
    nome_prod VARCHAR (50) NOT NULL,
    unidade VARCHAR (20) NOT NULL,
    data_cad timestamp default current_timestamp,
    PRIMARY KEY(id)
);
desc tbl_produtos;

CREATE TABLE IF NOT EXISTS tbl_valor_produtos (
    id INT NOT NULL AUTO_INCREMENT,
    id_prod INT NOT NULL,
    valor DECIMAL(10 , 2 ) NOT NULL,
    data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_tbl_produtos_tbl_valor_produtos FOREIGN KEY (id_prod)
        REFERENCES tbl_produtos (id)
);
desc tbl_valor_produtos;

INSERT INTO tbl_produtos (nome_prod, unidade) values 
('Produto A', 'Kilograma'),
('Produto B', 'unidade'),
('Produto C', 'litro'),
('Produto D', 'Kilograma');

INSERT INTO tbl_produtos(nome_prod, unidade) VALUES
('Produto E', 'unidade');

SELECT * FROM tbl_produtos;

INSERT INTO tbl_valor_produtos (id_prod, valor) values
(1, 10.50),
(2, 15.75),
(3, 20.00);

INSERT INTO tbl_valor_produtos (id_prod, valor) values
(1, 12.50),
(2, 13.00),
(3, 23.00),
(4, 16.00);

SELECT * FROM tbl_valor_produtos;

DROP TABLE tbl_valor_produtos;

-- Esse modelo com INNER JOIN tras somente campos totalmente preenchidos nas tabelas a realizar a consolidação
SELECT
    p.nome_prod,
    vp.valor,
    p.unidade,
    vp.data_cad
FROM
    tbl_produtos p
        INNER JOIN
    tbl_valor_produtos vp ON p.id = vp.id_prod
ORDER BY p.nome_prod;

-- Esse modelo com LEFT OUTER JOIN tras todos os intens da tabela
SELECT 
    *
FROM
    tbl_produtos p
        LEFT OUTER JOIN
    tbl_valor_produtos vp ON p.id = vp.id_prod;
    
    /* RIGHT OUTER JOIN
*/
    SELECT
		p.nome_prod,
        vp.valor,
        p.unidade,
        vp.data_cad
	FROM
		tbl_produtos p 
	RIGHT OUTER JOIN
		tbl_valor_produtos vp ON p.id = vp.id_prod;
        
        
/* CROSS JOIN*/
SELECT 
	p.nome_prod,
	vp.valor,
	p.unidade,
	vp.data_cad
	FROM
		tbl_produtos p 
	CROSS JOIN
		tbl_valor_produtos vp;
    
    SELECT *
		FROM tbl_valor_produtos
			WHERE valor IN (12.5, 20);
            
	SELECT *
		FROM tbl_valor_produtos
			WHERE valor NOT IN (20);
            
	SELECT *
		FROM tbl_produtos
			WHERE id IN (SELECT id_prod FROM tbl_valor_produtos WHERE valor < 20);
            
	SELECT *
		FROM tbl_produtos
			WHERE id NOT IN (SELECT id_prod FROM tbl_valor_produtos WHERE valor < 16);
            
	SELECT *
		FROM tbl_produtos p
			WHERE p.id > ALL (SELECT id_prod FROM tbl_valor_produtos WHERE valor < 16);
            
	SELECT *
		FROM tbl_produtos p
			WHERE p.id = ANY (SELECT id_prod FROM tbl_valor_produtos WHERE valor < 20);
            
	SELECT nome_prod
		FROM tbl_produtos p
			WHERE EXISTS(
				SELECT *
					FROM tbl_valor_produtos vp
						WHERE vp.id_prod = p.id AND vp.valor < 20
							);
                            
SELECT NOW(); /*SELECIONA A DATA ATUAL*/

	SELECT
		p.nome_prod AS produto,
		vp.valor as valor_unitario,
        vp.valor * 4 AS preco_total        
	FROM
		tbl_produtos p
	JOIN 
		tbl_valor_produtos vp on p.id = vp.id_prod
	WHERE 	
		p.nome_prod = "Produto A"
	ORDER BY 
		vp.data_cad DESC
	LIMIT 1;
    
    