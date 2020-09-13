
/**
 * Model class for Dialogflow card
*/
  export default class DFCard {

    title:string="";
    subtitle:string="";
    text:string="";
    imageUrl:string="";
    buttonText:string="";
    buttonUrl:string="";
    platform:string="";


    constructor(card:any,platform:string) {
      if (card === undefined || (typeof card === 'object' && !card.title)) {
        throw new Error('title string required by Card constructor');
      }
      if (typeof card === 'string') {
        this.title = card;
      } else if (typeof card === 'object') {
        this.title = card.title;
        this.text = card.text;
        this.imageUrl = card.imageUrl;
       
        this.buttonText = card.buttonText;
        this.buttonUrl = card.buttonUrl;
        this.platform = platform;
      }
    }


/**
 * return JSON data from class object
*/
getJSON():any{
      return{
        card: {
          title: this.title,
          subtitle: this.text,
          imageUri:this.imageUrl,
          buttons: [
            {
              text: this.buttonText,
              postback: this.buttonUrl
            }
          ]
        },
        platform: this.platform
      
    }

  }
}
  