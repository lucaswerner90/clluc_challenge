// Here we import the module to load the response, I decided to create a separate file to mantain the code clean

// As you can see, I'm using the new ES6 features, which I consider a good improvement for JS.
// This code is compiled after to ES5 through the gulp file.

// Here is the main class of the application
import 'whatwg-fetch';

class APIClass{
  constructor(){
    this.SOURCES_URL=[""];
    this.CATEGORIES=[
      {
        name:"Business",
        id:"business"
      },
      {
        name:"Entertainment",
        id:"entertainment"
      },
      {
        name:"Gaming",
        id:"gaming"
      },
      {
        name:"General",
        id:"general"
      },
      {
        name:"Music",
        id:"music"
      },
      {
        name:"Politics",
        id:"politics"
      },
      {
        name:"Science and nature",
        id:"science-and-nature"
      },
      {
        name:"Sport",
        id:"sport"
      },
      {
        name:"Technology",
        id:"technology"
      }
    ];

    this.API_SOURCES_URL="https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=148617c833c4406c80320ba99a8b6770";
    this.news=[];
    this.select_element=document.getElementsByName("select_category")[0];
    this.title_filter=document.getElementsByName("terms")[0];

    this.select_element.addEventListener("change",(e)=>this._changeSelectValue(e));
    this.title_filter.addEventListener("keyup",(e)=> this._changeFilterValue(e));
    this.title_filter.addEventListener("click",(e)=> e.preventDefault());


    this._populateSelect(this.CATEGORIES);

    this._loadNewsData();


  }


  _hideShowLoadingMessage(hide=true){
    document.getElementById("loading").style.display=(hide)?'none':'block';
  }

  _changeFilterValue(e){
    const _self=this;
    _self._filterNews(_self.news,e.target.value);
  }

  _filterNews(news,filtro=""){
    const _self=this;
    let articles=news.articles.filter((article)=>{
      return article.title.toLowerCase().indexOf(filtro.toLowerCase())>-1;
    });

    _self.paintNews(articles);
  }

  _clearArticles(){
    const articles_content=document.getElementById('articles');
    articles_content.innerHTML="";
  }
  paintNews(articles){
    const articles_content=document.getElementById('articles');
    const _self=this;
    _self._clearArticles();
    /*
    <div class="article">
      <img src="img/buho.png" alt="">
      <div class="row">
        <p>Titulo</p>
        <a href="#">Link</a>
      </div>
    </div>
    */
    for (let i = 0; i < articles.length; i++) {
      const div_article=document.createElement('div');
      div_article.className="article";

      const img_article=document.createElement('img');
      img_article.src=articles[i].urlToImage;


      const row_element=document.createElement('div');
      row_element.className="row";

      const title=document.createElement('p');
      title.innerHTML=articles[i].title;

      const linkTo=document.createElement('a');
      linkTo.innerHTML="Read more";


      row_element.appendChild(title);
      row_element.appendChild(linkTo);

      div_article.appendChild(img_article);
      div_article.appendChild(row_element);
      articles_content.appendChild(div_article);
    }
  }


  _loadNewsData(category="general"){

    const _self=this;
    _self._hideShowLoadingMessage(false);
    fetch('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=148617c833c4406c80320ba99a8b6770')
    .then((response)=> {
      return response.json();
    })
    .then((response)=>{
      _self.news=response;
      _self._hideShowLoadingMessage();

    })
    .catch((error)=>{
      console.error(error);
    })
  }

  _changeSelectValue(e){
    const _self=this;
    console.log("Select value changed");
    _self._loadNewsData(e.target.value);
  }

  _populateSelect(array){
    const _self=this;

    for (let i = 0; i < array.length; i++) {
      let option=document.createElement("option");
      option.text=array[i].name;
      option.value=array[i].id;
      _self.select_element.appendChild(option);
    }
  }



}


new APIClass();
