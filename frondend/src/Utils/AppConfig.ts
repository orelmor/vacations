class AppConfig{
    // Auth Urls
    public registerUrl = "http://localhost:3001/api/auth/register"
    public loginUrl = "http://localhost:3001/api/auth/login"

    // images url
    public imagesUrl = 'http://localhost:3001/api/vacations/images/'

    // Vacations Urls
    public vacationsUrl = 'http://localhost:3001/api/vacations/'

    // Urls for follow and unfollow 
    public addToFavUrl  ="http://localhost:3001/api/vacations-addToFavs/"
    public removeFromFavUrl  ="http://localhost:3001/api/vacations-deleteFromFavs/"

    // Filter vacation Urls
    public followedByUserUrl = "http://localhost:3001/api/vacations/following/"
    public futureVacationsUrl = "http://localhost:3001/api/futureVacations/"
    public activeVacationsUrl = 'http://localhost:3001/api/activeVacations/'

}

const appConfig = new AppConfig()
export default appConfig