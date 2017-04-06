/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
//var x = require('../src/js/common.js');
import hilightSkills from '../src/js/common.js';


//var common = require("./common");
var jsdom = require('jsdom');
var assert = require('assert');

var document = jsdom.jsdom("<body> <p>also PHP also</p></body>");
var window = document.defaultView;

global.window = window;
global.$ = require('jquery');


describe('hilightSkills', function() {
  describe('baseCase', function() {
    it('Base functionality. Plain text no duplicates', function() {
        var $body = $("body");
        
        $body.html("bla bla my Mysql ....PHP kk");
        var skills = ["mysql", "php"];
        hilightSkills($body);
        var $labels = $body.find('.label');
        
        // count off occurences equal to test array size.
        assert.equal($body.find('.label').length,skills.length);
        // all occurencess must be changed
        $labels.each(function( skill ) {
           // console.log( skill + ": " + $( this ).text() );
            assert.notEqual(-1, skills.indexOf($( this ).text().toLowerCase()));
        });
        
        //console.log($body.html());
        
    });
    
    
    it('Text inside tags', function() {
        var $body = $("body");
        
        $body.html("bla bla my <p> Mysql </p> ....PHP kk");
        var skills = ["mysql", "php"];
        hilightSkills($body);
        var $labels = $body.find('.label');
        
        // count off occurences equal to test array size.
        assert.equal($body.find('.label').length,skills.length);
        // all occurencess must be changed
        $labels.each(function( skill ) {
            console.log( skill + ": " + $( this ).text() );
            assert.notEqual(-1, skills.indexOf($( this ).text().toLowerCase()));
        });
        
        //console.log($body.html());
        
    });
    
    it('Duplicates', function() {
        var $body = $("body");
        
        $body.html("bla bla <p> my PHP ....</p> PHP kk");
        var skills = ["php"];
        hilightSkills($body);
        var $labels = $body.find('.label');
        assert.equal($body.find('.label').length,2);
        // all occurencess must be changed
        $labels.each(function(  ) {
            assert.notEqual(-1, skills.indexOf($( this ).text().toLowerCase()));
        });
        
        //console.log($body.html());
        
    });
    
    
     it('Special symbols', function() {
        var $body = $("body");
        
        $body.html("bla bla C++ .... kk");
        var skills = ["c++"];
        hilightSkills($body);
        var $labels = $body.find('.label');
        console.log("Body "+$body.html());
        assert.equal($body.find('.label').length,1);
        // all occurencess must be changed
        $labels.each(function(  ) {
            assert.notEqual(-1, skills.indexOf($( this ).text().toLowerCase()));
        });
        
        
        
    });
  });
});



