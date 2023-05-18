class AppConfig {
    // Database
    public host = "localhost" // Computer name/ address of our database
    public user = "root" // Database user
    public password = "" // Database password
    public database = "vacations_manager" // Database name

    // Server Port
    public port = 3001
}

const appConfig = new AppConfig()

export default appConfig