USE VENDAS;

-- ADIÇÃO
SELECT 100 + 50 as result;

-- ADIÇÃO E SUBTRAÇÃO
SELECT 100 + 8 - 20 as result;

-- SUBTRAÇÃO
SELECT 8 - 5 as result;

-- MULTIPLICAÇÃO
SELECT 2 * 5 as result;

-- MULTIPLICAÇÃO COM ADIÇÃO
SELECT (2 * 5 + 10) as result;

-- MULTIPLICAÇÃO COM DIVISÃO
SELECT (2 * 5 / 10) as result;

/*MULTIPLICAÇÃO, ADIÇÃO E DIVISÃO*/
SELECT ((2 * 5) + 10 / 10) RESULT;

/*ARREDONDANDO VALORES*/
SELECT ROUND(2 * 5 / 13) RESULT;


SELECT * FROM tbl_valor_produtos;

/*UPDATE COM OPERAÇÃO ARITMÉTICA*/
UPDATE tbl_valor_produtos AS vp
	SET
		vp.valor = vp.valor * 1.05
	WHERE 
		id = 3;
        
        /*FUNÇÕES DE DATA*/
        /*Calcula a subtração em uma data através do intervalo informado*/
        SELECT DATE_SUB(NOW(), INTERVAL 2 DAY);
        SELECT DATE_SUB(NOW(), INTERVAL 2 HOUR);
        SELECT DATE_SUB(NOW(), INTERVAL 2 YEAR);
        SELECT DATE_SUB(NOW(), INTERVAL 2 MINUTE);
        SELECT DATE_SUB(NOW(), INTERVAL 120 SECOND);
        SELECT DATE_SUB('2024-04-10', INTERVAL 2 DAY);
        
        SELECT DATE_ADD(NOW(), INTERVAL 2 DAY);
        
        /*Retorna a data atual*/
        SELECT CURDATE();
        
        /*Retorna a hora atual*/
        SELECT CURTIME();
        
        /*COUNT: Usada para contar o número de registros retornados por uma consulta*/
        SELECT COUNT(*) AS QTD_PRODUTOS FROM VENDAS.TBL_PRODUTOS;
        
        /* SUM: Usada par calcular a soma de valores em uma coluna */
        SELECT SUM(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;
        
        /* AVG: Usada para calcular a média de valores em uma coluna */
        SELECT AVG(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;
        
        /* MAX: Usada para encontrar o valor máximo em uma coluna */
        SELECT MAX(VALOR) AS VALOR FROM VENDAS.TBL_VALOR_PRODUTOS;
        SELECT MAX(ID) AS MAIOR_ID FROM VENDAS.TBL_VALOR_PRODUTOS;
        SELECT MAX(ID) AS MAIOR_ID FROM VENDAS.TBL_PRODUTOS;
        
        /*MIN: Usada para encontrar o valor mínimo em uma coluna */
		SELECT MIN(VALOR) AS MENOR_ID FROM VENDAS.TBL_VALOR_PRODUTOS;
        SELECT MIN(ID) AS MENOR_ID FROM VENDAS.TBL_VALOR_PRODUTOS;
        SELECT MIN(ID) AS MENOR_ID FROM VENDAS.TBL_PRODUTOS;

        /* GROUP BY: Usada para agrupar registros com base em valores semelhantes em uma ou mais colunas */
        SELECT ID_PROD FROM VENDAS.TBL_VALOR_PRODUTOS GROUP BY ID_PROD;
        
        /*ORDER BY: Usada para classificar os resultados de uma consulta em ordem ascendente ou descendente */
        SELECT 
			ID_PROD
		FROM
			VENDAS.TBL_VALOR_PRODUTOS
		GROUP BY ID_PROD
        ORDER BY ID_PROD DESC;
        
        /*DISTINCT: Usada para retornar valores distintos em uma coluna */
        SELECT DISTINCT(ID_PROD) FROM VENDAS.TBL_VALOR_PRODUTOS;
        
        /* LIKE: Usada para realizar uma correspondência de padrões em uma consulta, útil para pesquisas */
        SELECT * FROM VENDAS.TBL_PRODUTOS WHERE NOME_PROD LIKE 'A%';
        SELECT * FROM VENDAS.TBL_PRODUTOS WHERE NOME_PROD LIKE '%Rr%';
        
        /*LIMIT: Usada para restringir o número de registros retornados por uma consulta */
        SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY ID LIMIT 3;
        SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY NOME_PROD LIMIT 2;
        SELECT * FROM VENDAS.TBL_PRODUTOS ORDER BY NOME_PROD DESC LIMIT 2;
        
        /*Arredondamento de números */
        SELECT ROUND(123.4545, 2), ROUND(123.45, -2);
        
        /* Raíz quadrada */
        SELECT SQRT(9), SQRT(16);
        
        /* Retorna o menor inteiro ou igual à expressão numérica especificada */
        SELECT FLOOR(123.45), FLOOR(-123.45), FLOOR(12.99);
        
        /*Retorna o valor da expressão especificada para a potência indicada */
        SELECT POWER(5, 5);
        
        /* Retorna o valor do PI */
        SELECT PI();
        
