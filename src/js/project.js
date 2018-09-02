/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';

export default class Project{
    
    constructor(jsonData,$template) {
    this.data = jsonData;
    this.$template = $template;
  }
  
  _prepareLinks(rawLinks){
        
        var links = null;
        
        switch (typeof(rawLinks)) {
            case "string":
                if (rawLinks.length > 0){
                    links = [rawLinks];
                }
                break;
            
            case "object":
                    links = rawLinks;
                break;

            default:
                // undefined
                    links = null;
                break;
        }
 
        return links;
        
    }
    
    
    
    _addLinks2Project(rawInput,$pattern){
        var links = this._prepareLinks(rawInput);
        if (links !== null){
            var $li = $pattern.find("ul li");
            var $ul = $pattern.find("ul");
            for (let s of links) {
                var $newLi = $li.clone();
                $newLi.find("a").attr("href",s);
                $ul.append($newLi);
            }
            $li.remove();
            //this.formatLinks($ul);
        }
    }
   getHtml($pattern){
        var current = this.data;
        $pattern = this.$template;
        
        $pattern.attr("id","");
        $pattern.find("h3 a").html(current.title);
        
        for (var property in current) {
            if (current.hasOwnProperty(property)) {
                // do stuff
                switch (property) {
                    case 'image':
                        var preparedText = 'design/projects/'+current[property].toLowerCase();
                        $pattern.find("#"+property).attr('src',preparedText);
                        break;
                    case 'color':
                        $pattern.find(".project-title").addClass(current[property].toLowerCase());
                        break;

                    case 'url':
                        var $title = $pattern.find("#title");
                        if (current[property] === ''){
                            $title.attr('href','javascript:void(9)');
                            $pattern.find("url").remove();
                        }
                        else{
                            $title.attr('href',current[property]);
                            $pattern.find("url").attr('href',current[property]).html(current[property]);
                        }
                        break
                    case 'link':
                        this._addLinks2Project(current[property],$pattern);
                    break

                    default:
                       var preparedText =  current[property].replace(/\n/g, "<br />");
                       $pattern.find("#"+property).html(preparedText);
                }
            }
        }
        return $pattern;
    
  }
    
}

