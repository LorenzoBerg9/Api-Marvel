import app from "./app";

function main(){
    app.listen(3001, 'localhost', () => {
        console.log("servidor rondando na porta 3000")
    })
}

main()
