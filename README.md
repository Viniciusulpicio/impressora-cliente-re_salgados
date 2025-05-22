
# 🖨️ Sistema de Impressão de Comandas - tiaresalgados.com.br

## 📄 Descrição
Este sistema foi desenvolvido exclusivamente para a aplicação **[tiaresalgados.com.br](https://tiaresalgados.com.br)**.

Ele verifica automaticamente os pedidos feitos no site e imprime as comandas na impressora térmica da loja, sem necessidade de intervenção manual.

---

## 🖥️ Requisitos

### ✅ Computador
- Windows 10 ou superior
- Conexão estável com a internet

### ✅ Impressora
- Impressora térmica compatível com ESC/POS  
*(Exemplos: Knup, Elgin, Epson, Bematech, etc.)*
- Impressora conectada via **USB** e **compartilhada na rede**
- Nome de compartilhamento configurado (exemplo: `knup`)

---

## 📦 Instalação

### 1️⃣ Instalar Node.js
- Acesse: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/)
- Baixe a versão **LTS (Recomendada)**
- Instale normalmente (**Avançar, Avançar, Concluir**)

---

### 2️⃣ Baixar o Sistema
- Faça o download da pasta enviada: **`impressora-tiaresalgados.zip`**
- Extraia essa pasta em um local fácil, por exemplo:  
`C:\impressora-tiaresalgados`

---

### 3️⃣ Instalar Dependências
1. Acesse a pasta extraída.
2. Clique com o botão direito segurando **Shift** em um espaço vazio e selecione:  
**“Abrir janela do PowerShell aqui”** ou **“Abrir Terminal aqui”**.
3. Digite o comando abaixo e pressione **Enter**:

```bash
npm install
```

Isso instalará todos os arquivos necessários para o funcionamento do sistema.

---

## 🔌 Configurar a Impressora

1. Conecte a impressora via USB.
2. Acesse **Painel de Controle > Dispositivos e Impressoras**.
3. Clique com o botão direito na impressora e escolha **“Propriedades da Impressora”**.
4. Vá até a aba **“Compartilhamento”**.
5. Marque **“Compartilhar esta impressora”**.
6. Defina o nome como:  
**`knup`** (ou qualquer nome desejado, mas deverá ser o mesmo no sistema).

---

## ⚙️ Configurar o Sistema

Se o nome da sua impressora **não for `knup`**, altere essa linha no arquivo `index.js`:

```javascript
interface: '\\localhost\knup',
```

➡️ Exemplo, se o nome da impressora for `minha-impressora`:

```javascript
interface: '\\localhost\minha-impressora',
```

> ⚠️ Atenção: As duas barras duplas (`\\`) são obrigatórias na frente de `localhost`.

---

## 🚀 Executar o Sistema

### ✅ Método Simples (Manual)

1. Abra o terminal na pasta do projeto.
2. Execute:

```bash
node index.js
```

> ❌ Se fechar o terminal, o sistema para.

---

### 🚀 Método Profissional (Recomendado) - Usando PM2

#### 🔧 Instalar o PM2:

```bash
npm install pm2 -g
```

Se PM2 não for reconhecido, siga este procedimento:
- Rode:

```bash
npm config get prefix
```

- Copie o caminho exibido (ex.: `C:\Users\SeuUsuario\AppData\Roaming\npm`).
- Adicione este caminho no **Path** das **Variáveis de Ambiente** do Windows.

#### 🔥 Rodar o sistema:

```bash
pm2 start cliente-impressora-local.js --name impressora-tiaresalgados
```

#### 💾 Salvar para iniciar automático:

```bash
pm2 save
pm2 startup
```

> O comando `pm2 startup` gerará uma linha. Copie e execute ela no terminal.

#### 🛠️ Comandos úteis:

- Verificar status:

```bash
pm2 list
```

- Ver logs:

```bash
pm2 logs impressora-tiaresalgados
```

- Parar:

```bash
pm2 stop impressora-tiaresalgados
```

- Reiniciar:

```bash
pm2 restart impressora-tiaresalgados
```

- Remover:

```bash
pm2 delete impressora-tiaresalgados
```

---

## ⚠️ Erros Comuns e Soluções

| 🔥 Erro | 🛠️ Solução |
|--------|----------------|
| `Error: Cannot find printer` | Verifique se a impressora está ligada, instalada e se o nome está correto na configuração do sistema. |
| `Error: Timeout` | A impressora pode estar desconectada. Verifique os cabos, se está ligada e se o nome na configuração está correto. |
| Não imprime a imagem | Verifique se o arquivo `logo.png` está na mesma pasta do sistema. |
| Erro de conexão com o site | Verifique se sua internet está funcionando e se o site [tiaresalgados.com.br](https://tiaresalgados.com.br) está online. |

---

## 🔗 Aplicação Oficial

Este sistema funciona exclusivamente integrado à plataforma:  
➡️ **[https://tiaresalgados.com.br](https://tiaresalgados.com.br)**
