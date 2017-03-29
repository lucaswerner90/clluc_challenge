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
    this.select_element.addEventListener("change",this._changeSelectValue);
    this.title_filter=document.getElementsByName("terms")[0];
    this.title_filter.addEventListener("change",this._changeFilterValue);
    this._populateSelect(this.CATEGORIES);

    this._loadNewsData();


  }


  _hideShowLoadingMessage(hide=true){
    document.getElementById("loading").style.display=(hide)?'none':'block';
  }

  _changeFilterValue(e){
    console.log(e.target.value);
    const _self=this;
  }

  _filterNews(news,filtro=""){
    const _self=this;
    _self.news.articles=news.articles.filter((article)=>{
      return article.title.toLowerCase().indexOf(filtro.toLowerCase())>-1;
    });

    console.log(_self.news.articles);
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
