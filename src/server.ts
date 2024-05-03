import app from "./app";

const PORT = 3001;

function main(){
    app.listen(PORT, 'localhost', () => {
        console.log(`servidor rondando na porta ${PORT}`)
    })
}

main()
