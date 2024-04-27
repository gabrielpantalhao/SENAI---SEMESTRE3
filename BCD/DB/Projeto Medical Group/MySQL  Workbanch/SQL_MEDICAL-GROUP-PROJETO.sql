CREATE DATABASE clinica;
USE clinica;


CREATE TABLE IF NOT EXISTS tbl_endereco (
	id INT NOT NULL AUTO_INCREMENT,
    logradouro VARCHAR(100) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    estado VARCHAR(45) NOT NULL,
    numero VARCHAR(45) NOT NULL,
    complemento VARCHAR(45),
    cep VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tbl_pessoa (
	id INT NOT NULL AUTO_INCREMENT,
	endereco_id INT NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_nasc DATE NOT NULL,
    genero VARCHAR(30) NOT NULL,
    email VARCHAR(125) NOT NULL,
    data_cad TIMESTAMP NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_endereco_tbl_pessoa FOREIGN KEY (endereco_id)
        REFERENCES tbl_endereco(id)
);

DESC tbl_pessoa;

CREATE TABLE IF NOT EXISTS tbl_telefone (
	id INT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(20) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tbl_telefone_has_tbl_pessoa (
	pessoa_id INT NOT NULL,
    telefone_id INT NOT NULL,
    pessoa_tbl_endereco_id INT NOT NULL,
    
    CONSTRAINT fk_tbl_telefone_tbl_pessoa FOREIGN KEY(telefone_id)
    REFERENCES tbl_telefone(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_telefone FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id),
    
    CONSTRAINT fk_tbl_endereco_tbl_telefone FOREIGN KEY(pessoa_tbl_endereco_id)
    REFERENCES tbl_endereco(id)
);

DESC tbl_telefone_has_tbl_pessoa;

DESC tbl_pessoa;

CREATE TABLE IF NOT EXISTS tbl_paciente (
	id INT NOT NULL AUTO_INCREMENT,
    pessoa_id INT NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_paciente FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id)
    );
    
    DESC tbl_paciente;
    
    CREATE TABLE IF NOT EXISTS tbl_login (
	id INT NOT NULL AUTO_INCREMENT,
    login VARCHAR(125) NOT NULL,
    senha VARCHAR(500) NOT NULL,
    status_login TINYINT NOT NULL,
    pessoa_id INT NOT NULL,
    pessoa_endereco_id INT NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_login FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id),
    
    CONSTRAINT fk_tbl_endereco_tbl_login FOREIGN KEY(pessoa_endereco_id)
    REFERENCES tbl_endereco(id)
    );
    
    DESC tbl_login;
    
    CREATE TABLE IF NOT EXISTS tbl_perfis (
	id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(125) NOT NULL,
    login_id INT NOT NULL,
    login_pessoa_id INT NOT NULL,
    login_pessoa_endereco_id INT NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_login_tbl_perfis FOREIGN KEY(login_id)
    REFERENCES tbl_login(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_perfis FOREIGN KEY(login_pessoa_id)
    REFERENCES tbl_pessoa(id),
    
    CONSTRAINT fk_tbl_endereco_tbl_perfis FOREIGN KEY (login_pessoa_endereco_id)
    REFERENCES tbl_endereco(id)
    );
    
    DESC tbl_perfis;
    
	CREATE TABLE IF NOT EXISTS tbl_funcionario (
	id INT NOT NULL AUTO_INCREMENT,
    data_admissao DATE NOT NULL,
    crm VARCHAR(12) NOT NULL,
    pessoa_id INT NOT NULL,
    pessoa_endereco_id INT NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_funcionario FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id),
    
    CONSTRAINT fk_tbl_endereco_tbl_funcionario FOREIGN KEY(pessoa_endereco_id)
    REFERENCES tbl_endereco(id)
    );
    
	CREATE TABLE IF NOT EXISTS tbl_consulta (
	id INT NOT NULL AUTO_INCREMENT,
    data_consulta DATE NOT NULL,
    hora TIME NOT NULL,
    status_consulta TINYINT NOT NULL,
    paciente_id INT NOT NULL,
    paciente_pessoa_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    funcionario_pessoa_id INT NOT NULL,
    
    PRIMARY KEY(id),
    
    CONSTRAINT fk_tbl_paciente_tbl_consulta FOREIGN KEY(paciente_id)
    REFERENCES tbl_paciente(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_consulta FOREIGN KEY(paciente_pessoa_id)
    REFERENCES tbl_pessoa(id),
    
	CONSTRAINT fk_tbl_funcionario_tbl_consulta FOREIGN KEY(funcionario_id)
    REFERENCES tbl_funcionario(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_consulta2 FOREIGN KEY(funcionario_pessoa_id)
    REFERENCES tbl_pessoa(id)
    );
    
    DESC tbl_consulta;
    
	CREATE TABLE IF NOT EXISTS tbl_especialidade (
	id INT NOT NULL AUTO_INCREMENT,
    desc_especialidade VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
    );
    
    DESC tbl_especialidade;
    
    CREATE TABLE IF NOT EXISTS TBL_FUNCIONARIO_HAS_TBL_ESPECIALIDADE (
    especialidade_id INT NOT NULL,
    funcionario_id INT NOT NULL,
    funcionario_pessoa_endereco_id INT NOT NULL,
    funcionario_pessoa_id INT NOT NULL,
    
    CONSTRAINT FK_TBL_ESPECIALIDADE_TBL_FUNCIONARIO FOREIGN KEY(especialidade_id)
    REFERENCES TBL_ESPECIALIDADE (ID),
    CONSTRAINT FK_TBL_FUNCIONARIO_TBL_ESPECIALIDADE FOREIGN KEY(funcionario_id)
    REFERENCES TBL_FUNCIONARIO (ID),
    CONSTRAINT FK_TBL_FUNCIONARIO_TBL_PESSOA_TBL_ENDERECO FOREIGN KEY(funcionario_pessoa_endereco_id)
    REFERENCES TBL_ENDERECO (ID),
    CONSTRAINT FK_TBL_FUNCIONARIO_TBL_PESSOA FOREIGN KEY(funcionario_pessoa_id)
    REFERENCES TBL_PESSOA (ID)
);

    DESC tbl_funcionario_has_tbl_especialidade;
    
    CREATE TABLE IF NOT EXISTS TBL_PRONTUARIO (
	ID INT NOT NULL auto_increment,
    DIAGNOSTICO VARCHAR(1000) NOT NULL,
    MEDICACAO VARCHAR(300) NOT NULL,
    consulta_id INT NOT NULL,
    especialidade_id INT NOT NULL,
    consulta_paciente_id INT NOT NULL,
    consulta_paciente_pessoa_id INT NOT NULL,
    consulta_funcionario_id INT NOT NULL,
    consulta_funcionario_pessoa_id INT NOT NULL,
    PRIMARY KEY (ID),
    CONSTRAINT FK_TBL_ESPECIALIDADE_TBL_CONSULTA FOREIGN KEY(especialidade_id)
    REFERENCES TBL_ESPECIALIDADE (ID),
    CONSTRAINT FK_TBL_CONSULTA_TBL_ESPECIALIDADE FOREIGN KEY(consulta_id)
    REFERENCES TBL_CONSULTA (ID),
    CONSTRAINT FK_TBL_CONSULTA_TBL_PACIENTE FOREIGN KEY(consulta_paciente_id)
    REFERENCES TBL_PACIENTE (ID),
    CONSTRAINT FK_TBL_CONSULTA_TBL_PACIENTE_TBL_PESSOA FOREIGN KEY(consulta_paciente_pessoa_id)
    REFERENCES TBL_PESSOA (ID),
    CONSTRAINT FK_TBL_CONSULTA_TBL_FUNCIONARIO FOREIGN KEY(consulta_funcionario_id)
    REFERENCES TBL_FUNCIONARIO (ID),
    CONSTRAINT FK_TBL_CONSULTA_TBL_FUNCIONARIO_TBL_PESSOA FOREIGN KEY(consulta_funcionario_pessoa_id)
    REFERENCES TBL_PESSOA (ID)
);
    
    
    -- Inserções para tbl_endereco
INSERT INTO tbl_endereco (logradouro, bairro, estado, numero, complemento, cep) VALUES 
('Rua A', 'Bairro A', 'Estado A', '123', 'Complemento A', '12345-678'),
('Rua B', 'Bairro B', 'Estado B', '456', 'Complemento B', '98765-432'),
('Rua C', 'Bairro C', 'Estado C', '789', 'Complemento C', '54321-876'),
('Rua D', 'Bairro D', 'Estado D', '101', 'Complemento D', '24680-135'),
('Rua E', 'Bairro E', 'Estado E', '111', 'Complemento E', '13579-024');


-- Inserções para tbl_pessoa
INSERT INTO tbl_pessoa (tbl_endereco_id, cpf, nome, data_nasc, genero, email, data_cad) VALUES 
(1, '12345678901', 'Fulano A', '1990-01-01', 'Masculino', 'fulanoA@example.com', CURRENT_TIMESTAMP),
(2, '23456789012', 'Fulano B', '1991-02-02', 'Feminino', 'fulanoB@example.com', CURRENT_TIMESTAMP),
(3, '34567890123', 'Fulano C', '1992-03-03', 'Masculino', 'fulanoC@example.com', CURRENT_TIMESTAMP),
(4, '45678901234', 'Fulano D', '1993-04-04', 'Feminino', 'fulanoD@example.com', CURRENT_TIMESTAMP),
(5, '56789012345', 'Fulano E', '1994-05-05', 'Masculino', 'fulanoE@example.com', CURRENT_TIMESTAMP);


-- Inserções para tbl_telefone
INSERT INTO tbl_telefone (numero) VALUES 
('111-1111'),
('222-2222'),
('333-3333'),
('444-4444'),
('555-5555');

DESC tbl_telefone_has_tbl_pessoa;
    -- Inserções para tbl_telefone_has_tbl_pessoa
INSERT INTO tbl_telefone_has_tbl_pessoa (telefone_id, pessoa_id) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
 SELECT * FROM tbl_telefone_has_tbl_pessoa;
    
    -- Inserções para tbl_paciente
INSERT INTO tbl_paciente (pessoa_id) VALUES 
(1),
(2),
(3),
(4),
(5);
SELECT * FROM tbl_funcionario;

INSERT INTO tbl_funcionario (data_admissao, crm, pessoa_id) VALUES
	('2015-11-23', '34567886', 1),
    ('2000-01-01', '12345644', 2),
    ('2024-05-08', '76548392', 4);

-- Inserções para tbl_consulta
INSERT INTO tbl_consulta (data_consulta, hora, funcionario_id, paciente_id) VALUES 
('2024-04-01', '09:00:00', 16, 1),
('2024-04-02', '10:00:00', 17, 2),
('2024-04-03', '11:00:00', 18, 3),
('2024-04-04', '12:00:00', 17, 4),
('2024-04-05', '13:00:00', 18, 5);

SELECT * FROM tbl_funcionario;
DESC tbl_consulta;
SELECT * FROM tbl_consulta;

    /* 1 - REALIZAR A CONTAGEM DOS REGISTROS EXISTENTES NA TABELA PESSOA, EXIBIR SOMENTE O VALOR TOTAL. */
    
SELECT COUNT(*) AS qtd_pessoas FROM tbl_pessoa;


/*2 - REALIZAR A CONTAGEM DOS REGISTROS EXISTENTES NA TABELA PACIENTE E NA TABELA FUNCIONÁRIO, 
SOMAR OS DOIS RESULTADOS, MOSTRAR A SOMA DAS TABELAS INDIVIDUAIS E A SOMA DAS DUAS TABELAS. */

SELECT COUNT(*) AS totalPacientes FROM tbl_paciente;
SELECT COUNT(*) AS totalFuncionarios FROM tbl_funcionario;
SELECT (SELECT COUNT(*) FROM tbl_paciente) + (SELECT COUNT(*) FROM tbl_funcionario) AS somaTotal;


/*3 - SELECIONAR E EXIBIR O TOTAL DE CONSULTAS CADASTRADAS NA TABELA.*/

SELECT COUNT(*) AS total_consultas FROM tbl_consulta;



/*4 - AGENDAR UMA CONSULTA PARA UM DETERMINADO PACIENTE PARA A DATA DE 25 DE MAIO DE 2024 ÀS 09H.*/

INSERT INTO tbl_consulta (paciente_id, funcionario_id, data_consulta, hora) values (4, 18, '2024-05-25', '09:00:00');
SELECT * FROM tbl_consulta;


-- 5. SELECIONAR O AGENDAMENTO DA CONSULTA DO ITEM 4 EXIBINDO O NOME DO PACIENTE, DO MÉDICO, ESPECIALIDADE E OS DADOS DA CONSULTA.

SELECT p.nome AS NomePaciente, f.nome AS NomeMedico, e.desc_especialidade AS Especialidade, c.data_consulta, c.hora
FROM tbl_consulta c
JOIN tbl_paciente pa ON c.paciente_id = pa.id
JOIN tbl_pessoa p ON pa.pessoa_id = p.id
JOIN tbl_funcionario fn ON c.funcionario_id = fn.id
JOIN tbl_pessoa f ON fn.pessoa_id = f.id
JOIN tbl_especialidade_has_tbl_funcionario ehf ON fn.id = ehf.funcionario_id
JOIN tbl_especialidade e ON ehf.especialidade_id = e.id
WHERE c.data_consulta = '2024-05-25' AND c.hora = '09:00:00';

-- 6. SELECIONAR TODOS OS LOGINS CADASTRADOS EXIBINDO OS CAMPOS: LOGIN, NOME DA PESSOA, CPF, DATA DE NASCIMENTO E EMAIL.
SELECT l.login, p.nome, p.cpf, p.data_nasc, p.email
FROM tbl_login l
JOIN tbl_pessoa p ON l.pessoa_id = p.id;

-- 7. SELECIONAR TODOS OS LOGINS CADASTRADOS EXIBINDO OS CAMPOS: LOGIN, NOME DA PESSOA, CPF, DATA DE NASCIMENTO E EMAIL. ORDENE POR ORDEM DECRESCENTE.
SELECT l.login, p.nome, p.cpf, p.data_nasc, p.email
FROM tbl_login l
JOIN tbl_pessoa p ON l.pessoa_id = p.id
ORDER BY l.login DESC;

-- 8. SELECIONAR TODOS OS MÉDICOS EXIBINDO SUAS RESPECTIVAS ESPECIALIDADES.
SELECT f.nome AS NomeMedico, e.desc_especialidade AS Especialidade
FROM tbl_funcionario f
JOIN tbl_pessoa p ON f.pessoa_id = p.id
JOIN tbl_especialidade_has_tbl_funcionario ehf ON f.id = ehf.funcionario_id
JOIN tbl_especialidade e ON ehf.especialidade_id = e.id;

-- 9. SELECIONAR AS CONSULTAS RELACIONADAS A UM DETERMINADO MÉDICO EXIBINDO AS ESPECIALIDADES.
SELECT c.data_consulta, c.hora, e.desc_especialidade
FROM tbl_consulta c
JOIN tbl_funcionario f ON c.funcionario_id = f.id
JOIN tbl_especialidade_has_tbl_funcionario ehf ON f.id = ehf.funcionario_id
JOIN tbl_especialidade e ON ehf.especialidade_id = e.id
WHERE f.id = 1;  -- Substitua 1 pelo ID do médico desejado

-- 10. CANCELAR UM AGENDAMENTO DE CONSULTA (SOMENTE COLABORADORES COM PERFIS ADMIN PODEM REALIZAR ESTA AÇÃO).
-- Supõe-se que a verificação do perfil administrativo seja feita na aplicação.
DELETE FROM tbl_consulta WHERE id = 1;  -- Substitua 1 pelo ID da consulta a ser cancelada

-- 11. EXIBIR TODOS OS PRONTUÁRIOS VINCULADOS A UM DETERMINADO PACIENTE, EXIBIR O NOME DO PACIENTE.
SELECT pr.diagnostico, pr.medicacao, p.nome AS NomePaciente
FROM tbl_prontuario pr
JOIN tbl_consulta c ON pr.consulta_id = c.id
JOIN tbl_paciente pa ON c.paciente_id = pa.id
JOIN tbl_pessoa p ON pa.pessoa_id = p.id
WHERE pa.id = 1;  -- Substitua 1 pelo ID do paciente

-- 12. SELECIONAR TODOS OS PRONTUÁRIOS VINCULADOS UMA ÚNICA ESPECIALIDADE RELACIONADOS A UM PACIENTE.
SELECT pr.diagnostico, pr.medicacao, p.nome AS NomePaciente
FROM tbl_prontuario pr
JOIN tbl_especialidade e ON pr.especialidade_id = e.id