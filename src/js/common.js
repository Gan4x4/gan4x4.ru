export function hilightSkills($root, skill ){
    if (typeof(skill) === 'undefined'){
        
        skill = ['PHP','MySQL','HTML','Javascript','JQuery','Laravel','Bootstrap','Java','Visual Basic','Android','Robotium','Mockito','Junit','Sikuli','Matlab','Selenium','C#',"C++"];
    }
    $root.each(function(){
            var text = $( this ).html();
            console.log( text);
            for(var i=0; i< skill.length; i++){
                // replace special symbol like '++'
                var  preparedPattern =   skill[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                /*
                 * Replace all occurences of current skill in text
                 * 1. We can't use second \\b becouse c++ ended on not - letter symbol
                 * 2. We must ignore text inside html tags: https://stackoverflow.com/questions/26951003/javascript-replace-all-but-only-outside-html-tags
                 */
                text =  text.replace(new RegExp('\\b'+preparedPattern+'[., ](?!([^<]+)?>)', 'gi'), " <span class='label label-default skill'>"+skill[i]+"</span> ");
            }
            $( this ).html(text);
        
    });
}

export function addGitSitesIcons(){
    $("a[href*='github.com'], a[href*='bitbucket.org']").each(function(){
        var gitsites = ['github','bitbucket'];
        var current = false;
        var href = $(this).attr('href');
        gitsites.forEach(function(item, i, arr) {
            if (href.indexOf(item) !== -1){
                current = item;
            }
        });
        if (current){
            var icon =  '<i class="fa fa-'+current+'" aria-hidden="true"></i> ';
            if ( $(this).html().indexOf(icon) === -1){
                // Add icon only once
                $(this).html(icon+$(this).html());
            }
        }
    });
}