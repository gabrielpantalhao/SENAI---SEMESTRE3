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
    tbl_endereco_id INT NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    nome VARCHAR(11) NOT NULL,
    data_nasc DATE NOT NULL,
    genero VARCHAR(30) NOT NULL,
    email VARCHAR(125) NOT NULL,
    data_cad TIMESTAMP NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tbl_endereco_tbl_pessoa FOREIGN KEY (tbl_endereco_id)
        REFERENCES tbl_endereco(id)
);

DESC tbl_pessoa;

CREATE TABLE IF NOT EXISTS tbl_telefone (
	id INT NOT NULL AUTO_INCREMENT,
    numero VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tbl_telefone_has_tbl_pessoa (
	telefone_id INT NOT NULL,
    pessoa_id INT NOT NULL,
	CONSTRAINT fk_tbl_telefone_tbl_pessoa FOREIGN KEY(telefone_id)
    REFERENCES tbl_telefone(id),
    
    CONSTRAINT fk_tbl_pessoa_tbl_telefone FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id)
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
    pessoa_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tbl_pessoa_tbl_login FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id)
    );
    
    DESC tbl_login;
    
    CREATE TABLE IF NOT EXISTS tbl_perfis (
	id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(125) NOT NULL,
    login_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tbl_login_tbl_perfis FOREIGN KEY(login_id)
    REFERENCES tbl_login(id)
    );
    
    DESC tbl_perfis;
    
	CREATE TABLE IF NOT EXISTS tbl_funcionario (
	id INT NOT NULL AUTO_INCREMENT,
    data_admissao DATE NOT NULL,
    crm VARCHAR(12) NOT NULL,
    pessoa_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tbl_pessoa_tbl_funcionario FOREIGN KEY(pessoa_id)
    REFERENCES tbl_pessoa(id)
    );
    
	CREATE TABLE IF NOT EXISTS tbl_consulta (
	id INT NOT NULL AUTO_INCREMENT,
    data_consulta DATE NOT NULL,
    hora TIME NOT NULL,
    funcionario_id INT NOT NULL,
    paciente_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_tbl_funcionario_tbl_consulta FOREIGN KEY(funcionario_id)
    REFERENCES tbl_funcionario(id),
    CONSTRAINT fk_tbl_funcionario2_tbl_consulta FOREIGN KEY(paciente_id)
    REFERENCES tbl_paciente(id)
    );
    
    DESC tbl_consulta;
    
	CREATE TABLE IF NOT EXISTS tbl_especialidade (
	id INT NOT NULL AUTO_INCREMENT,
    desc_especialidade VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
    );
    
    DESC tbl_especialidade;
    
    CREATE TABLE IF NOT EXISTS tbl_especialidade_has_tbl_funcionario (
	especialidade_id INT NOT NULL,
    funcionario_id INT NOT NULL,
	CONSTRAINT fk_tbl_especialidade_tbl_funcionario FOREIGN KEY(especialidade_id)
    REFERENCES tbl_especialidade(id),
    
    CONSTRAINT fk_tbl_especialidade_tbl_funcionario2 FOREIGN KEY(funcionario_id)
    REFERENCES tbl_funcionario(id)
);

    DESC tbl_especialidade_has_tbl_funcionario;
    
    CREATE TABLE IF NOT EXISTS tbl_prontuario (
	id INT NOT NULL AUTO_INCREMENT,
    diagnostico VARCHAR(1000) NOT NULL,
    medicacao VARCHAR(300) NOT NULL,
    especialidade_id INT NOT NULL,
    consulta_id INT NOT NULL,
    PRIMARY KEY(id),
	CONSTRAINT fk_tbl_especialidade_tbl_prontuario FOREIGN KEY(especialidade_id)
    REFERENCES tbl_especialidade(id),
    
	CONSTRAINT fk_tbl_especialidade_tbl_prontuario2 FOREIGN KEY(consulta_id)
    REFERENCES tbl_consulta(id)
    );