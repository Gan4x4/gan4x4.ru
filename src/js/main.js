        
"use strict";

//import hilightSkills from './common.js';
//import ('./common.js');
import {hilightSkills, addGitSitesIcons} from './common.js';
import Project from './project.js';

    function  formatLinks($root){
        $root.find("a:empty").each(function(){
                $(this).html($(this).attr('href'));
            
            });
    }
    function loadProjects(projects){
        for (var i in projects) {
            var $pattern = $("#project_template").clone();
            $pattern.removeClass("hidden");
            var project = new Project(projects[i],$pattern);
            var $filledPattern = project.getHtml();
            hilightSkills($filledPattern);
            formatLinks($filledPattern);
            $("#portfolio .container-fluid").append($pattern);
        }
        addGitSitesIcons();
     }
       
     // When your page loads equal $( document ).ready(function() 
    $(function(){
        // init pure jquery components
          
        // now DOM loaded but js script like bootstrap may be not  
        // $(window).on('load', function(){
            
            hilightSkills($('#portfolio'));

            // copy href to visible text in empty links
            formatLinks($("body"));
            
            // add icons to github and bitbucket links 
            addGitSitesIcons();
  
            // make some image scalable
            $(".img-sm").on('click',function(){
                    $('#modal-image').attr('src',$(this).attr('src'));
                    $('#modalWindow').modal('show');
                }
            );

            $("#all-projects").on('click',function(){   
               $.get("data/projects.json")
                    .done( (data) => loadProjects(data)   )
                    .fail( () => console.log('Error'))
                    .always( ()=> $("#all-projects").addClass('hidden'));     
            });
            
            
            
            
        //});
        
    });
   