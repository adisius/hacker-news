import Card from "./Card"

export default function Page(props){

    const news = props.news;
    return(
    <>
    {
        news && (
            //Mapping through valid news, creating component for each one
          news.map(function(singleNews, i){
            if(singleNews.author && singleNews.story_title && singleNews.story_url && singleNews.created_at){
                return <Card key={singleNews.objectID} news={singleNews} fav={false} toggleFav={props.toggleFav} />
            }
            return false;
          })
        )
    }
    </>
    )
    
}