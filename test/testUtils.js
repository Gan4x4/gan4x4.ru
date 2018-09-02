/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
//var x = require('../src/js/common.js');
import {hilightSkills} from '../src/js/common.js';


//var common = require("./common");
var jsdom = require('jsdom');
var assert = require('assert');

var document = jsdom.jsdom("<body> <p>also PHP also</p></body>");
var window = document.defaultView;

global.window = window;
global.$ = require('jquery');

//*================== helper methods =========================

function getHilighted(){
    return $("body").find('.label');
}

function assertSkillsHilight(skills,$html){
    var $labels = $html.find('.label');
    // count off occurences equal to test array size.
    assert.equal($labels.length,skills.length);
    // all occurencess must be changed
    $labels.each(function( skill ) {
        assert.notEqual(-1, skills.indexOf($( this ).text().toLowerCase()));
    });
}
//*===========================================================


describe('Utils_functions_to_change_html', function() {
    
     // runs after each test in this block
    afterEach(function() {
        // clear html body
        $("body").html('');
      });
    
  describe('hilightSkills', function() {
    it('Base functionality. Plain text no duplicates', function() {
        var $body = $("body");
        $body.html("bla bla my Mysql ....PHP kk");
        hilightSkills($body);
        assertSkillsHilight(["mysql", "php"],$body);
    });
    
    
    it('Text inside tags', function() {
        var $body = $("body");
        
        $body.html("bla bla my <p> Mysql </p> ....PHP kk");
        hilightSkills($body);
        assertSkillsHilight(["mysql", "php"],$body); 
    });
    
    it('Duplicates', function() {
        var $body = $("body");
        $body.html("bla bla <p> my PHP ....</p> PHP kk");
        hilightSkills($body);
        assertSkillsHilight(["php","php"],$body); 
    });
    
    
     it('Special symbols', function() {
        var $body = $("body"); 
        $body.html("bla bla C++ .... kk");
        hilightSkills($body);
        assertSkillsHilight(["c++"],$body);        
    });
    
    
    it('World inside another', function() {
        var $body = $("body"); 
        $body.html("bla bla Javascript .... kk");
        hilightSkills($body);
        console.log($body.html());
        var actual = getHilighted().text();
        assert.equal('Javascript',actual);
        //assertSkillsHilight(["java","javascript"],$body);        
    });
    
    it('World inside hyperlink', function() {
        var $body = $("body"); 
        $body.html("bla bla <a href=\"http://android.google.com\">Android</a>");
        var expected_links = [];
        $body.find("a").each(function(){
            expected_links.push($(this).attr('href')); 
        });
        
        
        hilightSkills($body);
        var actual_links = [];
        $body.find("a").each(function(){
            actual_links.push($(this).attr('href')); 
        });
        
        assert.deepEqual(expected_links,actual_links);
        
        //console.log($body.html());
        var actual = getHilighted().text();
        //console.log("Actual =".actual);
        assert.equal([],actual);
        
        
        
    });
    
  });
});



