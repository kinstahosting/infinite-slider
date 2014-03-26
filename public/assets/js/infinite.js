//variables for options
if(!infinite_vars.autoslidetime || infinite_vars.autoslidetime == false) {
	infinite_vars.autoslidetime = 5000;
}

if(!infinite_vars.slideanimtime || infinite_vars.slideanimtime == false) {
	infinite_vars.slideanimtime = 250;
} else {
	infinite_vars.slideanimtime = parseInt(infinite_vars.slideanimtime);
}

if(!infinite_vars.hoverpanelon || infinite_vars.hoverpanelon=="on" || infinite_vars.hoverpanelon == "") {
	infinite_vars.hoverpanelon = 'on';
} else {
	infinite_vars.hoverpanelon = 'hoverpanelisoff';
}

if(!infinite_vars.gridstyle || infinite_vars.gridstyle == "") {
	infinite_vars.gridstyle = 'blackthin';
}

if(!infinite_vars.coverstyle || infinite_vars.coverstyle == "") {
	infinite_vars.coverstyle = 'blacktransp';
}

if(!infinite_vars.fixwidthslideon || infinite_vars.fixwidthslideon == "off" || infinite_vars.fixwidthslideon == "") {
	infinite_vars.fixwidthslideon = 'off';
} else {
	infinite_vars.fixwidthslideon = 'on';
	if(!infinite_vars.fixwidth || infinite_vars.fixwidth == "auto" || infinite_vars.fixwidth == "") {
		infinite_vars.fixwidth = "auto";
	}
}

var allowclick = true;
var allowdrag = true;
var prevpos=0;
var leftbase = 0;
var dragcurrent_iw_width = 0;
var dragoldmarginleft = 0;
var globalgap = 0;
var globaltimes = 0;
var globalleftoffset = 0;
var globaldeltablock = 0;

/*
grids: none, whitecurved, whitethin, blackcurved, blackthin
covers: none, whitestripes, blackstripes, blackdots, whitetransp, blacktransp
*/

curgrid = 'grid'+infinite_vars.gridstyle;
curcover = infinite_vars.coverstyle;

var block1 = '<div class="block block1"><div class="stand3wrapleft"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div><div class="doublestand3wrapleft"><div class="midblockleft"><div class="midblockleftco midblockleftco-cover'+curcover+'"><div class="midblockleftgr midblockleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div></div></div>';
var block2 = '<div class="block block2"><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="midblockleft"><div class="midblockleftco midblockleftco-cover'+curcover+'"><div class="midblockleftgr midblockleft'+curgrid+'"></div></div></div><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div>';
var block3 = '<div class="block block3"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div>';
var block4 = '<div class="block block4"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div></div>';
var block5 = '<div class="block block5"><div class="doublestand3wrapleft"><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="stand2wrapleft"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div><div class="stand2wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div></div><div class="stand3wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div></div>';
var block6 = '<div class="block block6"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="midblockleft"><div class="midblockleftco midblockleftco-cover'+curcover+'"><div class="midblockleftgr midblockleft'+curgrid+'"></div></div></div></div>';
var block7 = '<div class="block block7"><div class="stand2wrapleft"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div><div class="stand2wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div><div class="stand2wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div></div>';
var block8 = '<div class="block block8"><div class="stand3wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div><div class="stand3wrapleft"><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div></div><div class="stand3wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div></div>';
var block9 = '<div class="block block9"><div class="doublestand3wrapleft"><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div><div class="stand3wrapleft"><div class="standbrickleft"><div class="standbrickleftco standbrickleftco-cover'+curcover+'"><div class="standbrickleftgr standbrickleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div></div></div>';
var block10 = '<div class="block block10"><div class="midblockleft"><div class="midblockleftco midblockleftco-cover'+curcover+'"><div class="midblockleftgr midblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="smallblockleft"><div class="smallblockleftco smallblockleftco-cover'+curcover+'"><div class="smallblockleftgr smallblockleft'+curgrid+'"></div></div></div><div class="brickleft"><div class="brickleftco brickleftco-cover'+curcover+'"><div class="brickleftgr brickleft'+curgrid+'"></div></div></div></div>';

var blockar = [ block1, block2, block3, block4, block5, block6, block7, block8, block9, block10 ];
var timergoing = null;

function PrependBlock()
{
	var smallimages = new Array();
	var midimages = new Array();
	var brickimages = new Array();
	var standbrickimages = new Array();


	for( i = 0; i < infinite_vars.imgurls.length; i++) {
		var cutfilename = infinite_vars.imgurls[i].substring(0,  (infinite_vars.imgurls[i].length - 4));
		var currentfileext = infinite_vars.imgurls[i].split('.').pop();
		smallimages[i]= cutfilename+'-120x120.' + currentfileext;
		midimages[i]= cutfilename+'-240x240.' + currentfileext;
		brickimages[i]= cutfilename+'-240x120.' + currentfileext;
		standbrickimages[i]= cutfilename+'-120x240.' + currentfileext;
	}

	jQuery("#innerwrapper").prepend(blockar[Math.floor(Math.random()*blockar.length)]);

	jQuery("#innerwrapper").find('.block').first().find('.smallblockleft').each(function(){
		var thisindex = Math.floor(Math.random()*smallimages.length);
		var imageUrl = smallimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').first().find('.midblockleft').each(function(){
		var thisindex = Math.floor(Math.random()*midimages.length);
		var imageUrl = midimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').first().find('.brickleft').each(function(){
		var thisindex = Math.floor(Math.random()*brickimages.length);
		var imageUrl = brickimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').first().find('.standbrickleft').each(function(){
		var thisindex = Math.floor(Math.random()*standbrickimages.length);
		var imageUrl = standbrickimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	smallimages = null;
	midimages = null;
	brickimages = null;
	standbrickimages = null;
}

function AppendBlock()
{
	var smallimages = new Array();
	var midimages = new Array();
	var brickimages = new Array();
	var standbrickimages = new Array();

	for( i = 0; i < infinite_vars.imgurls.length; i++)
	{
		var cutfilename = infinite_vars.imgurls[i].substring(0,  (infinite_vars.imgurls[i].length - 4));
		var currentfileext = infinite_vars.imgurls[i].split('.').pop();
		smallimages[i]= cutfilename+'-120x120.' + currentfileext;
		midimages[i]= cutfilename+'-240x240.' + currentfileext;
		brickimages[i]= cutfilename+'-240x120.' + currentfileext;
		standbrickimages[i]= cutfilename+'-120x240.' + currentfileext;
	}

	jQuery("#innerwrapper").append(blockar[Math.floor(Math.random()*blockar.length)]);

	jQuery("#innerwrapper").find('.block').last().find('.smallblockleft').each(function(){
		var thisindex = Math.floor(Math.random()*smallimages.length);
		var imageUrl = smallimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').last().find('.midblockleft').each(function(){
		var thisindex = Math.floor(Math.random()*midimages.length);
		var imageUrl = midimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').last().find('.brickleft').each(function(){
		var thisindex = Math.floor(Math.random()*brickimages.length);
		var imageUrl = brickimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});
	jQuery("#innerwrapper").find('.block').last().find('.standbrickleft').each(function(){
		var thisindex = Math.floor(Math.random()*standbrickimages.length);
		var imageUrl = standbrickimages[thisindex];
		jQuery(this).css('background-image', 'url(' + imageUrl + ')');
		smallimages.splice(thisindex, 1);
		midimages.splice(thisindex, 1);
		brickimages.splice(thisindex, 1);
		standbrickimages.splice(thisindex, 1);
	});

	smallimages = null;
	midimages = null;
	brickimages = null;
	standbrickimages = null;
}

function startSteps(id)
{

	jQuery("#"+id).find('.smallblockleftco').each(function(){
		jQuery(this).addClass('smallblockleftco-cover'+curcover+'').removeClass('smallblockleftco-hover');
	});
	jQuery("#"+id).find('.midblockleftco').each(function(){
		jQuery(this).addClass('midblockleftco-cover'+curcover+'').removeClass('midblockleftco-hover');
	});
	jQuery("#"+id).find('.brickleftco').each(function(){
		jQuery(this).addClass('brickleftco-cover'+curcover+'').removeClass('brickleftco-hover');
	});
	jQuery("#"+id).find('.standbrickleftco').each(function(){
		jQuery(this).addClass('standbrickleftco-cover'+curcover+'').removeClass('standbrickleftco-hover');
	});
}


function endSteps()
{
	//initialize blockpositions
	var ii=0;
	var current_block_count = jQuery("#innerwrapper").find('.block').length;
	if(current_block_count == 4)
	{
		ii=-1;
	}
	else
	{
		if(current_block_count == 6)
		{
			ii=-2;
		}
		else
		{
			ii=-3;
		}

	}
	jQuery("#innerwrapper").find('.block').each(function(){
		jQuery(this).attr("id",ii);
		ii++;
	});

	jQuery('#0').find('.smallblockleftco').each(function(){
		jQuery(this).addClass('smallblockleftco-hover').removeClass('smallblockleftco-cover'+curcover+'');
	});
	jQuery('#0').find('.midblockleftco').each(function(){
		jQuery(this).addClass('midblockleftco-hover').removeClass('midblockleftco-cover'+curcover+'');
	});
	jQuery('#0').find('.brickleftco').each(function(){
		jQuery(this).addClass('brickleftco-hover').removeClass('brickleftco-cover'+curcover+'');
	});
	jQuery('#0').find('.standbrickleftco').each(function(){
		jQuery(this).addClass('standbrickleftco-hover').removeClass('standbrickleftco-cover'+curcover+'');
	});
}

function startSteps2()
{
	jQuery('#0').find('.smallblockleftab').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.smallblockleftabframe').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.standbrickleftab').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.standbrickleftabframe').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.brickleftab').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.brickleftabframe').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.midblockleftab').each(function(){
		jQuery(this).remove();
	});
	jQuery('#0').find('.midblockleftabframe').each(function(){
		jQuery(this).remove();
	});
}
function endSteps2()
{
	jQuery('#0').find('.smallblockleft').each(function(){
		var currpicfilenameraw = jQuery(this).css('background-image');
		currpicfilenameraw = currpicfilenameraw.replace(/\"/g,'')

		var currpicfilename = currpicfilenameraw.substring(4,  (currpicfilenameraw.length - 1));
		var currendfileext = currpicfilename.split('.').pop();
		var currbase = currpicfilename.substring(0,  (currpicfilename.length - 12)) + '.'+ currendfileext;

		var imgindex = infinite_vars.imgurls.indexOf(currbase);
		var currtitle = infinite_vars.infinite_slides[imgindex]['title'];
		var currbody = infinite_vars.infinite_slides[imgindex]['excerpt'];

		jQuery(this).prepend('<div class="smallblockleftab"><div class="smallblockleftgrey"><div class="smallblocklefthtitle">'+currtitle+'</div><div class="smallblocklefthbody">'+currbody+'</div></div></div><div class="smallblockleftabframe smallblockleft'+curgrid+'"></div>');
	});

	if(	infinite_vars.hoverpanelon == 'on') {
		jQuery(".smallblockleftgrey").animate({
					'top': "85px"
				}, 100);
	}

	jQuery('#0').find('.standbrickleft').each(function(){
		var currpicfilenameraw = jQuery(this).css('background-image');
		currpicfilenameraw = currpicfilenameraw.replace(/\"/g,'')
		var currpicfilename = currpicfilenameraw.substring(4,  (currpicfilenameraw.length - 1));
		var currendfileext = currpicfilename.split('.').pop();
		var currbase = currpicfilename.substring(0,  (currpicfilename.length - 12)) + '.'+ currendfileext;
		var imgindex = infinite_vars.imgurls.indexOf(currbase);
		var currtitle = infinite_vars.infinite_slides[imgindex]['title'];
		var currbody = infinite_vars.infinite_slides[imgindex]['excerpt'];

		jQuery(this).prepend('<div class="standbrickleftab"><div class="standbrickleftgrey"><div class="standbricklefthtitle">'+currtitle+'</div><div class="standbricklefthbody">'+currbody+'</div></div></div><div class="standbrickleftabframe standbrickleft'+curgrid+'"></div>');
	});

	if(	infinite_vars.hoverpanelon == 'on'){
		jQuery(".standbrickleftgrey").animate({
					'top': "205px"
				}, 100);
	}

	jQuery('#0').find('.brickleft').each(function(){
		var currpicfilenameraw = jQuery(this).css('background-image');
		currpicfilenameraw = currpicfilenameraw.replace(/\"/g,'')
		var currpicfilename = currpicfilenameraw.substring(4,  (currpicfilenameraw.length - 1));
		var currendfileext = currpicfilename.split('.').pop();
		var currbase = currpicfilename.substring(0,  (currpicfilename.length - 12)) + '.'+ currendfileext;
		var imgindex = infinite_vars.imgurls.indexOf(currbase);
		var currtitle = infinite_vars.infinite_slides[imgindex]['title'];
		var currbody = infinite_vars.infinite_slides[imgindex]['excerpt'];

		jQuery(this).prepend('<div class="brickleftab"><div class="brickleftgrey"><div class="bricklefthtitle">'+currtitle+'</div><div class="bricklefthbody">'+currbody+'</div></div></div><div class="brickleftabframe  brickleft'+curgrid+'"></div>');
	});
	if(	infinite_vars.hoverpanelon == 'on'){
		jQuery(".brickleftgrey").animate({
					'top': "85px"
				}, 100);
	}

	jQuery('#0').find('.midblockleft').each(function(){
		var currpicfilenameraw = jQuery(this).css('background-image');
		currpicfilenameraw = currpicfilenameraw.replace(/\"/g,'')
		var currpicfilename = currpicfilenameraw.substring(4,  (currpicfilenameraw.length - 1));
		var currendfileext = currpicfilename.split('.').pop();
		var currbase = currpicfilename.substring(0,  (currpicfilename.length - 12)) + '.'+ currendfileext;
		var imgindex = infinite_vars.imgurls.indexOf(currbase);
		var currtitle = infinite_vars.infinite_slides[imgindex]['title'];
		var currbody = infinite_vars.infinite_slides[imgindex]['excerpt'];

		jQuery(this).prepend('<div class="midblockleftab"><div class="midblockleftgrey"><div class="midblocklefthtitle">'+currtitle+'</div><div class="midblocklefthbody">'+currbody+'</div></div></div><div class="midblockleftabframe midblockleft'+curgrid+'"></div>');
	});
	if(	infinite_vars.hoverpanelon == 'on'){
		jQuery(".midblockleftgrey").animate({
					'top': "205px"
				}, 100);
	}
}


function slideLeft(times, needendsteps2)
{
	if(allowclick == true)
	{

		deltapixel=360;
		switch (times)
		{
			case 2:
			  deltapixel=720;
			  break;
			case 3:
			  deltapixel=1080;
			  break;
			case 4:
			  deltapixel=1440;
			  break;
		}

		allowclick = false;
		allowdrag = false;

		var oldmarginleft = parseInt(jQuery("#innerwrapper").css('margin-left'));

		//set SlideW width
		current_sw_width = jQuery('#slidewrapper').width();
		jQuery('#slidewrapper').width(current_sw_width+deltapixel);
		current_iw_width = jQuery("#innerwrapper").width();
		jQuery("#innerwrapper").width(current_iw_width+deltapixel);


		AppendBlock();
		globaltimes = 1;
		switch (times)
		{
			case 2:
			AppendBlock();
			globaltimes = 2;
			  break;
			case 3:
			AppendBlock();
			AppendBlock();
			globaltimes = 3;
			  break;
			case 4:
			AppendBlock();
			AppendBlock();
			AppendBlock();
			globaltimes = 4;
			  break;
		}


		jQuery("#innerwrapper").animate({
				"margin-left": (oldmarginleft-deltapixel)
			}, infinite_vars.slideanimtime, function() {
		jQuery("#innerwrapper").find('.block').first().remove();
		switch (times)
		{
			case 2:
			jQuery("#innerwrapper").find('.block').first().remove();
			  break;
			case 3:
			jQuery("#innerwrapper").find('.block').first().remove();
			jQuery("#innerwrapper").find('.block').first().remove();
			  break;
			case 4:
			jQuery("#innerwrapper").find('.block').first().remove();
			jQuery("#innerwrapper").find('.block').first().remove();
			jQuery("#innerwrapper").find('.block').first().remove();
			  break;
		}
		globaltimes = 0;

		jQuery("#innerwrapper").css('margin-left',(oldmarginleft)+'px');
		jQuery("#innerwrapper").width(current_iw_width);
		jQuery('#slidewrapper').width(current_sw_width);

		startSteps2();

		startSteps(0);
	  	endSteps();

		if(needendsteps2 == 1)
		{
			endSteps2();
		}

		allowclick = true;
		allowdrag = true;
	  });

	  return false;
  }
  else
  {
	return false;
  }
}

function slideRight(times, needendsteps2)
{
	if(allowclick == true)
	{
		deltapixel=360;
		switch (times)
		{
			case 2:
			  deltapixel=720;
			  break;
			case 3:
			  deltapixel=1080;
			  break;
			case 4:
			  deltapixel=1440;
			  break;
		}

		allowclick = false;
		allowdrag = false;

		var oldmarginleft = parseInt(jQuery("#innerwrapper").css('margin-left'));

		//set SlideW width
		current_sw_width = jQuery('#slidewrapper').width();
		jQuery('#slidewrapper').width(current_sw_width+deltapixel);
		current_iw_width = jQuery("#innerwrapper").width();
		jQuery("#innerwrapper").width(current_iw_width+deltapixel);

		PrependBlock();
		globaltimes = 1;
		switch (times)
		{
			case 2:
			PrependBlock();
			globaltimes = 2;
			  break;
			case 3:
			PrependBlock();
			PrependBlock();
			globaltimes = 3;
			  break;
			case 4:
			PrependBlock();
			PrependBlock();
			PrependBlock();
			globaltimes = 4;
			  break;
		}
		jQuery("#innerwrapper").css('margin-left',(oldmarginleft-deltapixel)+'px');

		jQuery("#innerwrapper").animate({
				"margin-left": (oldmarginleft)
			}, infinite_vars.slideanimtime, function() {
		jQuery("#innerwrapper").find('.block').last().remove();
		switch (times)
		{
			case 2:
			jQuery("#innerwrapper").find('.block').last().remove();
			  break;
			case 3:
			jQuery("#innerwrapper").find('.block').last().remove();
			jQuery("#innerwrapper").find('.block').last().remove();
			  break;
			case 4:
			jQuery("#innerwrapper").find('.block').last().remove();
			jQuery("#innerwrapper").find('.block').last().remove();
			jQuery("#innerwrapper").find('.block').last().remove();
			  break;
		}
		globaltimes = 0;

		jQuery("#innerwrapper").width(current_iw_width);
		jQuery('#slidewrapper').width(current_sw_width);

		startSteps2();

		startSteps(0);
		endSteps();

		if(needendsteps2 == 1)
		{
			endSteps2();
		}

		allowclick = true;
		allowdrag = true;
	  });

		return false;

	}
	else
	{
		return false;
	}
}

function removeFocus()
{
	jQuery("#frame").fadeOut(150);
	jQuery("#xdiv").fadeOut(150);
	jQuery("#imgdiv").fadeOut(150, function() {

		jQuery("#allblack").fadeOut(100, function(){
			jQuery('#xdiv').remove();
			jQuery('#allblack').remove();
			jQuery('#imgdiv').remove();
			jQuery('#frame').remove();
		});
	});
}

function randomFocus()
{
	var startingbaseurls = new Array();
	var ieach = 0;
	jQuery('#0').find('.smallblockleft, .midblockleft, .brickleft, .standbrickleft').each(function(){
		var currpicfilenameraw = jQuery(this).css('background-image');
		currpicfilenameraw = currpicfilenameraw.replace(/\"/g,'');
		var currpicfilename = currpicfilenameraw.substring(4,  (currpicfilenameraw.length - 1));
		var currendfileext = currpicfilename.split('.').pop();
		var currbase = currpicfilename.substring(0,  (currpicfilename.length - 12)) + '.'+ currendfileext;
		startingbaseurls[ieach] = currbase;
		ieach++;
	});

	currpicfilenameraw = null;
	currpicfilename = null;
	currendfileext = null;
	currbase = null;
	ieach = 0;
	var randomimgurl = startingbaseurls[Math.floor(Math.random()*startingbaseurls.length)];
	var cimgindex = infinite_vars.imgurls.indexOf(randomimgurl);
	var ctitle = infinite_vars.infinite_slides[cimgindex]['title'];
	var cbody = infinite_vars.infinite_slides[cimgindex]['excerpt'];
	var curl = infinite_vars.infinite_slides[cimgindex]['permalink'];
	var endfileext = randomimgurl.split('.').pop();
	var focus360 = randomimgurl.substring(0,  (randomimgurl.length - 4)) + '-360x360.' + endfileext;
	//inject absolute divs
	jQuery("#0").prepend('<div id="allblack"></div><div id="imgdiv"><img id="mainimg" src="'+focus360+'" alt=""></div><a href="'+curl+'"><div id="xdiv" class="'+curgrid+'"><img id="fullscreen" src="'+infinite_custom.plugin_dir_url+'/assets/img/fullscreen.png" "alt=""><img id="ximg" src="'+infinite_custom.plugin_dir_url+'/assets/img/x.png" "alt=""></div></a><div id="frame"><div id="focusblockgrey"><div class="focusblockhtitle">'+ctitle+'</div><div class="focusblockhbody">'+cbody+'</div><div id="focusblockbutton">read more</div></div></div>');

	if(infinite_vars.fixwidthslideon == "on")
	{
		var realcurrent_width = infinite_vars.fixwidth;
	}
	else
	{
		var realcurrent_width = jQuery(window).width();
	}

	//set ximg margin_left
	if(realcurrent_width < 355)
	{
		var corrrximg = 291-(360-realcurrent_width);
		jQuery("#ximg").css('margin-left', corrrximg+'px');
	}


	cimgindex = null;
	ctitle = null;
	cbody = null;
	curl = null;
	focus360 = null;
	endfileext = null;

	jQuery("#allblack").animate({backgroundColor: 'black'},
	250, function() {
		//fade-in 360x360
		jQuery("#imgdiv").fadeIn(500, function() {
			//smallhoverplacement
			endSteps2();

			if(	infinite_vars.hoverpanelon == 'on'){
				//focus coverinfo
				jQuery("#focusblockgrey").animate({
					'top': "240px"
				}, 250);
			}
		});
		jQuery("#xdiv").fadeIn(500);
	});
}


jQuery(document).ready(function() {
		if(( !jQuery('#innerwrapper').length))
		{
			return;
		}

		if(infinite_vars.fixwidthslideon == "on")
		{
			if(infinite_vars.fixwidth == "auto")
			{
				if(jQuery('#slidewrapper').parent().parent().width() && jQuery('#slidewrapper').parent().parent().width() != 0)
				{
					infinite_vars.fixwidth = jQuery('#slidewrapper').parent().parent().width();
				}
				else
				{
					if(jQuery('#slidewrapper').parent().parent().parent().width() && jQuery('#slidewrapper').parent().parent().parent().width() != 0)
					{
						infinite_vars.fixwidth = jQuery('#slidewrapper').parent().parent().parent().width();
					}
					else
					{
						if(jQuery('#slidewrapper').parent().parent().parent().parent().width() && jQuery('#slidewrapper').parent().parent().parent().parent().width() != 0)
						{
							infinite_vars.fixwidth = jQuery('#slidewrapper').parent().parent().parent().parent().width();
						}
						else
						{
							infinite_vars.fixwidth = 960;
						}
					}
				}
			}
		}

		AppendBlock();
		AppendBlock();
		AppendBlock();
		AppendBlock();

		if(infinite_vars.fixwidthslideon == "on")
		{
			var realcurrent_width = infinite_vars.fixwidth;
			var current_width = infinite_vars.fixwidth;
		}
		else
		{
			var current_width = jQuery(window).width();
			var realcurrent_width = jQuery(window).width();
		}



		if(current_width < 960)
		{
			current_width = 960;
		}
		//set SlideW width
		jQuery('#slidewrapper').width(current_width);

		if(current_width % 2 !== 0)
		{
			current_width++;
		}
		if(current_width >= 960)
		{
			var sidepad = (current_width-960)/2;
		}
		else
		{
			var sidepad = 0;
		}

		//add left/right blocks
		if(sidepad > 240)
		{
			if(sidepad <= 600)
			{
				//add 1-1 block
				PrependBlock();
				AppendBlock();
				//set InnerW width
				jQuery("#innerwrapper").width(2160);
				jQuery("#innerwrapper").css('margin-left', (sidepad-600)+'px');
				//set arrows margin_left
				if(curgrid == 'gridnone')
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+118)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+437)+'px');
				}
				else
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+120)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+435)+'px');
				}
			}
			else
			{
				//add 2-2 block
				PrependBlock();
				AppendBlock();
				PrependBlock();
				AppendBlock();
				//set InnerW width
				jQuery("#innerwrapper").width(2880);
				jQuery("#innerwrapper").css('margin-left', (sidepad-960)+'px');
				//set arrows margin_left
				if(curgrid == 'gridnone')
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+118)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+437)+'px');
				}
				else
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+120)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+435)+'px');
				}
			}
		}
		else
		{
			//set InnerW width
			jQuery("#innerwrapper").width(1440);
			//set InnerW margin_left
			if(realcurrent_width < 481)
			{
				jQuery("#innerwrapper").css('margin-left', '-360px');
			}
			else
			{
				jQuery("#innerwrapper").css('margin-left', (sidepad-240)+'px');
			}
			//set arrows margin_left
			if(curgrid == 'gridnone')
			{
				if(realcurrent_width < 481)
				{
					jQuery("#leftarrow").css('margin-left', '-2px');
					if(realcurrent_width < 361)
					{
						var corrrightarrow = 317-(360-realcurrent_width);
						jQuery("#rightarrow").css('margin-left', corrrightarrow+'px');
					}
					else
					{
						jQuery("#rightarrow").css('margin-left', '317px');
					}
				}
				else
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+118)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+437)+'px');
				}
			}
			else
			{
				if(realcurrent_width < 481)
				{
					jQuery("#leftarrow").css('margin-left', '0px');
					if(realcurrent_width < 359)
					{
						var corrrightarrow = 317-(360-realcurrent_width);
						jQuery("#rightarrow").css('margin-left', corrrightarrow+'px');
					}
					else
					{
						jQuery("#rightarrow").css('margin-left', '315px');
					}
				}
				else
				{
					jQuery("#leftarrow").css('margin-left', (sidepad+120)+'px');
					jQuery("#rightarrow").css('margin-left', (sidepad+435)+'px');
				}
			}
	}

	endSteps();

	randomFocus();

	if(infinite_vars.autoslideison=="on")
	{
		timergoing = setInterval(function() {
			jQuery('#xdiv').remove();
			jQuery('#allblack').remove();
			jQuery('#imgdiv').remove();
			jQuery('#frame').remove();

			slideLeft(1,0);

			jQuery( "#innerwrapper" ).promise().done(function() {
				randomFocus();
			});
		}, infinite_vars.autoslidetime);

		jQuery(document).on("mouseover", "#innerwrapper, #leftarrow, #rightarrow", function(event){
			clearInterval(timergoing);
		});
		jQuery(document).on("mouseout", "#innerwrapper, #leftarrow, #rightarrow", function(event){
			timergoing = setInterval(function() {
					jQuery('#xdiv').remove();
					jQuery('#allblack').remove();
					jQuery('#imgdiv').remove();
					jQuery('#frame').remove();

					slideLeft(1,0);
					jQuery( "#innerwrapper" ).promise().done(function() {
						randomFocus();
					});
				}, infinite_vars.autoslidetime);
		});
	}

	//eventtriggers
	jQuery("#innerwrapper").on("click", '.smallblockleft, .midblockleft, .standbrickleft, .brickleft', function(event){
		if(allowclick == true)
		{
			jQuery('#xdiv').remove();
			jQuery('#allblack').remove();
			jQuery('#imgdiv').remove();
			jQuery('#frame').remove();

			var thisblockid = jQuery(this).closest('.block').attr('id');
			var picfilenameraw = jQuery(this).css('background-image');
			picfilenameraw = picfilenameraw.replace(/\"/g,'')

			var picfilename = picfilenameraw.substring(4,  (picfilenameraw.length - 1));
			var endfileext = picfilename.split('.').pop();
			var focus360 = picfilename.substring(0,  (picfilename.length - 11)) + '360x360.' + endfileext;

			var cbase = picfilename.substring(0,  (picfilename.length - 12)) + '.'+ endfileext;
			var cimgindex = infinite_vars.imgurls.indexOf(cbase);
			var ctitle = infinite_vars.infinite_slides[cimgindex]['title'];
			var cbody = infinite_vars.infinite_slides[cimgindex]['excerpt'];
			var curl = infinite_vars.infinite_slides[cimgindex]['permalink'];

			if(thisblockid < 0)
			{
				startSteps2();
				slideRight((thisblockid*(-1)), 0);
			}
			else
			{
				if(thisblockid > 0)
				{
					startSteps2();
					slideLeft((thisblockid*(1)), 0);
				}
				else
				{
					//focusblock click
				}
			}


			jQuery( "#innerwrapper" ).promise().done(function() {

				//inject absolute divs
				jQuery("#0").prepend('<div id="allblack"></div><div id="imgdiv"><img id="mainimg" src="'+focus360+'" alt=""></div><a href="'+curl+'"><div id="xdiv" class="'+curgrid+'"><img id="fullscreen" src="'+infinite_custom.plugin_dir_url+'/assets/img/fullscreen.png" "alt=""><img id="ximg" src="'+infinite_custom.plugin_dir_url+'/assets/img/x.png" "alt=""></div></a><div id="frame"><div id="focusblockgrey"><div class="focusblockhtitle">'+ctitle+'</div><div class="focusblockhbody">'+cbody+'</div><div id="focusblockbutton">read more</div></div></div>');


				if(infinite_vars.fixwidthslideon == "on")
				{
					var realcurrent_width = infinite_vars.fixwidth;
				}
				else
				{
					var realcurrent_width = jQuery(window).width();
				}

				//set ximg margin_left
				if(realcurrent_width < 355)
				{
					var corrrximg = 291-(360-realcurrent_width);
					jQuery("#ximg").css('margin-left', corrrximg+'px');
				}

				jQuery("#allblack").animate({backgroundColor: 'black'},
				250, function() {
					//fade-in 360x360
					jQuery("#imgdiv").fadeIn(500, function() {
						//smallhoverplacement
						endSteps2();

						if(	infinite_vars.hoverpanelon == 'on'){
							//focus coverinfo
							jQuery("#focusblockgrey").animate({
								'top': "240px"
							}, 250);
						}
					});
					jQuery("#xdiv").fadeIn(500);
				});
			});

		}
		else
		{
		}
	});


	jQuery("#innerwrapper").on("click", "#ximg", function(event){
		removeFocus();
		return false;
	});

	jQuery("#innerwrapper").on("click", "#fullscreen", function(event){
		var currentmainimgraw = jQuery('#mainimg').attr('src');
		var currentmainimgendfileext = currentmainimgraw.split('.').pop();
		var fullimgurl = currentmainimgraw.substring(0,  (currentmainimgraw.length - 12)) + '.'+ currentmainimgendfileext;
		var view_width = jQuery(document).width();
		var view_height = jQuery(document).height();
		jQuery("body").append('<div id="fullscreencanvas"></div>');
		jQuery('#fullscreencanvas').width(view_width);
		jQuery('#fullscreencanvas').height(view_height);
		jQuery("#fullscreencanvas").fadeIn(500, function(){
				clearInterval(timergoing);
		});


		var fullimgurlwidth = 0;
		var fullimgurlheight = 0;
		var imgload = jQuery('<img src="'+fullimgurl+'"/>').load(function(){
			fullimgurlwidth = this.width;
			fullimgurlheight = this.height;

			jQuery("body").append('<div id="fswrapwrap"><div id="fullscreenimgwrapper"><img id="fullscreenximg" style="left:'+(fullimgurlwidth+10)+'px" src="'+infinite_custom.plugin_dir_url+'/assets/img/x.png" "alt=""><img id="mainimg" src="'+fullimgurl+'" alt=""></div></div>');
			jQuery('#fullscreenimgwrapper').width(fullimgurlwidth);
			jQuery('#fullscreenimgwrapper').height(fullimgurlheight);
			jQuery( "#fullscreencanvas" ).promise().done(function() {
				jQuery("#fullscreenimgwrapper").fadeIn(500);
			});
		});

	jQuery('body').on("click", "#fullscreenximg", function(event){
		jQuery("#fullscreenimgwrapper").fadeOut(150, function() {
			jQuery("#fullscreencanvas").fadeOut(100, function(){
				jQuery('#fswrapwrap').remove();
				jQuery('#fullscreencanvas').remove();

				if(infinite_vars.autoslideison=="on")
				{

					timergoing = setInterval(function() {
							jQuery('#xdiv').remove();
							jQuery('#allblack').remove();
							jQuery('#imgdiv').remove();
							jQuery('#frame').remove();

							slideLeft(1,0);

							jQuery( "#innerwrapper" ).promise().done(function() {
								randomFocus();
							});
						}, infinite_vars.autoslidetime);
				}
			});
		});

		return false;
	});



		return false;
	});

	if(	infinite_vars.hoverpanelon == 'on'){

		jQuery(document).on("mouseover", ".smallblockleftabframe", function(event){
			jQuery(this).parent().find(".smallblockleftgrey").stop().animate({
					 top:'0px'
				  },500);

		});
		jQuery(document).on("mouseout", ".smallblockleftabframe", function(event){
				jQuery(this).parent().find(".smallblockleftgrey").stop().animate({
						 top:'85px'
					  },1000);
		});

		jQuery(document).on("mouseover", ".standbrickleftabframe", function(event){
			jQuery(this).parent().find(".standbrickleftgrey").stop().animate({
					 top:'120px'
				  },500);

		});
		jQuery(document).on("mouseout", ".standbrickleftabframe", function(event){
				jQuery(this).parent().find(".standbrickleftgrey").stop().animate({
						 top:'205px'
					  },1000);
		});

		jQuery(document).on("mouseover", ".brickleftabframe", function(event){
			jQuery(this).parent().find(".brickleftgrey").stop().animate({
					 top:'0px'
				  },500);

		});
		jQuery(document).on("mouseout", ".brickleftabframe", function(event){
				jQuery(this).parent().find(".brickleftgrey").stop().animate({
						 top:'85px'
					  },1000);
		});

		jQuery(document).on("mouseover", ".midblockleftabframe", function(event){
			jQuery(this).parent().find(".midblockleftgrey").stop().animate({
					 top:'120px'
				  },500);

		});
		jQuery(document).on("mouseout", ".midblockleftabframe", function(event){
				jQuery(this).parent().find(".midblockleftgrey").stop().animate({
						 top:'205px'
					  },1000);
		});
	}

	//hover coversystem
	jQuery(document).on("mouseover", ".smallblockleftgr", function(event){
		jQuery(this).closest('.smallblockleftco').addClass('smallblockleftco-hover').removeClass('smallblockleftco-cover'+curcover+'');
	});
	jQuery(document).on("mouseout", ".smallblockleftgr", function(event){
		if(jQuery(this).closest('.block').attr('id') != "0"){
		jQuery(this).closest('.smallblockleftco').addClass('smallblockleftco-cover'+curcover+'').removeClass('smallblockleftco-hover');}
	});

	jQuery(document).on("mouseover", ".standbrickleftgr", function(event){
		jQuery(this).closest('.standbrickleftco').addClass('standbrickleftco-hover').removeClass('standbrickleftco-cover'+curcover+'');
	});
	jQuery(document).on("mouseout", ".standbrickleftgr", function(event){
		if(jQuery(this).closest('.block').attr('id') != "0"){
		jQuery(this).closest('.standbrickleftco').addClass('standbrickleftco-cover'+curcover+'').removeClass('standbrickleftco-hover');}
	});

	jQuery(document).on("mouseover", ".midblockleftgr", function(event){
		jQuery(this).closest('.midblockleftco').addClass('midblockleftco-hover').removeClass('midblockleftco-cover'+curcover+'');
	});
	jQuery(document).on("mouseout", ".midblockleftgr", function(event){
		if(jQuery(this).closest('.block').attr('id') != "0"){
		jQuery(this).closest('.midblockleftco').addClass('midblockleftco-cover'+curcover+'').removeClass('midblockleftco-hover');}
	});

	jQuery(document).on("mouseover", ".brickleftgr", function(event){
		jQuery(this).closest('.brickleftco').addClass('brickleftco-hover').removeClass('brickleftco-cover'+curcover+'');
	});
	jQuery(document).on("mouseout", ".brickleftgr", function(event){
		if(jQuery(this).closest('.block').attr('id') != "0"){
		jQuery(this).closest('.brickleftco').addClass('brickleftco-cover'+curcover+'').removeClass('brickleftco-hover');}
	});

	jQuery("#rightarrow").on("click", function(event){
		removeFocus();
		slideLeft(1,1);
	});

	jQuery("#leftarrow").on("click", function(event){
		removeFocus();
		slideRight(1,1);
	});

//update the width value when the browser is resized
jQuery(window).resize(function(){
		if(( !jQuery('#innerwrapper').length))
		{
			return;
		}

		if(infinite_vars.fixwidthslideon == "on")
		{
			var realcurrent_width = infinite_vars.fixwidth;
			var current_width = infinite_vars.fixwidth;
		}
		else
		{
			var current_width = jQuery(window).width();
			var realcurrent_width = jQuery(window).width();
		}
		//set SlideW width
		jQuery('#slidewrapper').width(current_width);
		jQuery('#fullscreencanvas').width(current_width);

		if(current_width < 960)
		{
			current_width = 960;
		}


		if(current_width % 2 !== 0)
		{
			current_width++;
		}
		if(current_width >= 960)
		{
			var sidepad = (current_width-960)/2;
		}
		else
		{
			var sidepad = 0;
		}

		//determine change direction and size
		//deltasize codes: -2, -1, 0, 1, 2
		var deltasize;
		var oldinnerwrapperwidth = jQuery('#innerwrapper').width();


		if(sidepad > 240)
		{
			if(sidepad <= 600)
			{
				if(oldinnerwrapperwidth == 2880)
				{
					deltasize = -1;
					//remove 1-1 blocks
					jQuery('#innerwrapper').find('.block').first().remove();
					jQuery('#innerwrapper').find('.block').last().remove();
				}
				else
				{
					if(oldinnerwrapperwidth == 2160)
					{
						deltasize = 0;
						//no block number change
					}
					else
					{
						//1440
						deltasize = 1;
						//add 1-1 block
						PrependBlock();
						AppendBlock();
					}
				}
				//set InnerW width
				jQuery('#innerwrapper').width(2160);
				jQuery("#innerwrapper").css('margin-left', (sidepad-600)+'px');
			}
			else
			{
				//sidepad > 600
				if(oldinnerwrapperwidth == 2880)
				{
					deltasize = 0;
					//no block number change
				}
				else
				{
					if(oldinnerwrapperwidth == 2160)
					{
						deltasize = 1;
						//add 1-1 block
						PrependBlock();
						AppendBlock();
					}
					else
					{
						//1440
						deltasize = 2;
						//add 2-2 block
						PrependBlock();
						AppendBlock();
						PrependBlock();
						AppendBlock();
					}
				}
				//set InnerW width
				jQuery('#innerwrapper').width(2880);
				jQuery("#innerwrapper").css('margin-left', (sidepad-960)+'px');
			}
		}
		else
		{
			//sidepad < 240
			if(oldinnerwrapperwidth == 2880)
			{
				deltasize = -2;
				//remove 2-2 blocks
				jQuery('#innerwrapper').find('.block').first().remove();
				jQuery('#innerwrapper').find('.block').last().remove();
				jQuery('#innerwrapper').find('.block').first().remove();
				jQuery('#innerwrapper').find('.block').last().remove();
			}
			else
			{
				if(oldinnerwrapperwidth == 2160)
				{
					deltasize = -1;
					//remove 1-1 blocks
					jQuery('#innerwrapper').find('.block').first().remove();
					jQuery('#innerwrapper').find('.block').last().remove();
				}
				else
				{
					//1440
					deltasize = 0;
					//no block number change
				}
			}
			//set InnerW width
			jQuery('#innerwrapper').width(1440);
			//set InnerW margin_left
			if(realcurrent_width < 481)
			{
				jQuery("#innerwrapper").css('margin-left', '-360px');
			}
			else
			{
				jQuery("#innerwrapper").css('margin-left', (sidepad-240)+'px');
			}

		}
		//set arrows margin_left
		if(curgrid == 'gridnone')
		{
			if(realcurrent_width < 481)
			{
				jQuery("#leftarrow").css('margin-left', '-2px');
				if(realcurrent_width < 361)
				{
					var corrrightarrow = 317-(360-realcurrent_width);
					jQuery("#rightarrow").css('margin-left', corrrightarrow+'px');
				}
				else
				{
					jQuery("#rightarrow").css('margin-left', '317px');
				}

			}
			else
			{
				jQuery("#leftarrow").css('margin-left', (sidepad+118)+'px');
				jQuery("#rightarrow").css('margin-left', (sidepad+437)+'px');
			}
		}
		else
		{
			if(realcurrent_width < 481)
			{
				jQuery("#leftarrow").css('margin-left', '0px');
				if(realcurrent_width < 359)
				{
					var corrrightarrow = 317-(360-realcurrent_width);
					jQuery("#rightarrow").css('margin-left', corrrightarrow+'px');
				}
				else
				{
					jQuery("#rightarrow").css('margin-left', '315px');
				}
			}
			else
			{
				jQuery("#leftarrow").css('margin-left', (sidepad+120)+'px');
				jQuery("#rightarrow").css('margin-left', (sidepad+435)+'px');
			}
		}

		//set ximg margin_left
		if(realcurrent_width < 355)
		{
			var corrrximg = 291-(360-realcurrent_width);
			jQuery("#ximg").css('margin-left', corrrximg+'px');
		}
		else
		{
			jQuery("#ximg").css('margin-left', '286px');
		}

		endSteps();
});


jQuery(function() {
  jQuery( "#innerwrapper" ).draggable({
	axis: "x",
	cursor: "move",
	start: function(e, ui) {
		if(allowdrag == true)
		{
			jQuery("#innerwrapper").removeClass('dragh').addClass('draggingh');
			removeFocus();
			allowclick = false;

			leftbase = 0;

			dragoldmarginleft = parseInt(jQuery("#innerwrapper").css('margin-left'));
			dragcurrent_iw_width = jQuery("#innerwrapper").width();
			jQuery("#innerwrapper").width(dragcurrent_iw_width+720);

			PrependBlock();
			AppendBlock();
			jQuery("#innerwrapper").css('margin-left',(dragoldmarginleft-360)+'px');

			endSteps();
		}
		else
		{
			return false;
		}

	},
	drag: function(e, ui) {
		var leftgapofslidewrapper = jQuery('#slidewrapper').offset().left - jQuery(window).scrollLeft();
		var dragleft = ui.offset.left-leftgapofslidewrapper;
		var gap = leftbase + dragleft;
		jQuery("#leftcal").text('leftbase: '+leftbase+' gap: '+gap);


		if(dragleft > prevpos)
		{
			var direction = 'right';

			if(gap >359 )
			{
				leftbase -= 360;

				var oldmarginleft = parseInt(jQuery("#innerwrapper").css('margin-left'));

				//set SlideW width
				current_sw_width = jQuery('#slidewrapper').width();
				jQuery('#slidewrapper').width(current_sw_width+360);
				current_iw_width = jQuery("#innerwrapper").width();
				jQuery("#innerwrapper").width(current_iw_width+360);

				PrependBlock();

				jQuery("#innerwrapper").css('margin-left',(oldmarginleft-360)+'px');

				jQuery("#innerwrapper").find('.block').last().remove();
				jQuery("#innerwrapper").width(current_iw_width);
				jQuery('#slidewrapper').width(current_sw_width);

				startSteps2();

				startSteps(0);
				endSteps();

				endSteps2();

			}

		}
		else
		{
			if(dragleft < prevpos)
			{
				var direction = 'left';

				if(gap < -359 )
				{
					leftbase += 360;

					var oldmarginleft = parseInt(jQuery("#innerwrapper").css('margin-left'));

					//set SlideW width
					current_sw_width = jQuery('#slidewrapper').width();
					jQuery('#slidewrapper').width(current_sw_width+360);
					current_iw_width = jQuery("#innerwrapper").width();
					jQuery("#innerwrapper").width(current_iw_width+360);

					AppendBlock();

					jQuery("#innerwrapper").css('margin-left',(oldmarginleft+360)+'px');

					jQuery("#innerwrapper").find('.block').first().remove();
					jQuery("#innerwrapper").width(current_iw_width);
					jQuery('#slidewrapper').width(current_sw_width);

					startSteps2();

					startSteps(0);
					endSteps();

					endSteps2();
				}
			}
			else
			{
				var direction = 'stall';
			}
		}

		prevpos = dragleft;

		},
	stop: function(e, ui) {
		jQuery("#innerwrapper").addClass('dragh').removeClass('draggingh');

		var rounded = 360*(Math.round(prevpos/360));

		var positive;
		if(prevpos >= 0)
		{
			positive = true;
			var prefrag = prevpos;
		}
		else
		{
			positive = false;
			var prefrag = prevpos*(-1);
		}
		var pp = prevpos/360;
		var floor = Math.floor(pp);
		if(prevpos >= 0)
		{
			var fragment = pp-floor;
		}
		else
		{
			var fragment = 1-(pp-floor);
		}

		jQuery("#routext").text(rounded);

		allowdrag = false;

		jQuery("#innerwrapper").animate({
				"left": (rounded)
			}, 250, function() {
			prevpos = rounded;

			if(positive == true)
			{
				if(fragment >= 0.5)
				{
					jQuery("#innerwrapper").find('.block').last().remove();
					jQuery("#innerwrapper").find('.block').last().remove();
					startSteps(0);
				}
				else
				{
					jQuery("#innerwrapper").find('.block').first().remove();
					jQuery("#innerwrapper").find('.block').last().remove();
				}
			}
			else
			{
				if(fragment > 0.5)
				{
					jQuery("#innerwrapper").find('.block').first().remove();
					jQuery("#innerwrapper").find('.block').first().remove();
					startSteps(0);
				}
				else
				{
					jQuery("#innerwrapper").find('.block').first().remove();
					jQuery("#innerwrapper").find('.block').last().remove();
				}
			}

			jQuery("#innerwrapper").width(dragcurrent_iw_width);
			jQuery("#innerwrapper").css('margin-left',(dragoldmarginleft)+'px');
			jQuery("#innerwrapper").css('left','0px');
			startSteps2();

			endSteps();

			endSteps2();

			allowclick = true;
			allowdrag = true;
		});

		}
	});

	});

});