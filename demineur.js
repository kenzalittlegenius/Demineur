//Le 5 novembre 2018
//TINA ZHANG
//KENZA BENMANSOUR
//Ce code correspond a une variante simplifiee 
//du jeu graphique le demineur :
//Un jeu de reflexion qui consiste a decouvrir
//par un processus d elimination a quel endroit
//se trouvent des mines cachees sous des tuiles 
//dispoees en gille

load('images.js');
                                                                                
var afficherImage = function(x,y,colormap,images) {
    
    //dessin par ligne pixelee
    for(var m = 0; m < images.length; m++) {
        
        //dessin par colonne pixelee
        for(var n = 0; n < images[0].length; n++) {
            
            setPixel(x*images[0].length 
                     + n,y*images.length 
                     + m,colormap[images[m][n]]);
        }
    }
    return;
};

var attendreClic = function() {
    
    //boucle qui attend le clic de la souris
    while(getMouse().down==false) {
        
        pause(0.01);
    }
    var coordonnee = {x:Math.floor(getMouse().x
                                   /images[0][0].length),
                      y:Math.floor(getMouse().y
                                   /images[0].length)};
    return coordonnee;
};

var placerMines = function(largeur, hauteur, nbMines, x, y) {
    
    //creation du tableau qui va contenir les mines
    var tabBoo = new Array(hauteur);
    
    for(var i = 0; i < hauteur; i++) {
        
        tabBoo[i] = new Array(largeur).fill(false);
    }
    
    //choix aleatoire sur les emplacements des mines
    for(var i = nbMines; nbMines > 0; nbMines--) {
        
        var randoX = Math.floor(Math.random()*largeur);
    	var randoY = Math.floor(Math.random()*hauteur);
        
		/*empeche la mise de mine sur 
        la premiere tuile cliquee
        et deux mines dans une tuile*/
        while(tabBoo[randoY][randoX] == true || 
              x == randoX && y == randoY) {
            
            randoX = Math.floor(Math.random()*largeur);
    		randoY = Math.floor(Math.random()*hauteur);
        }
        //place une mine
        tabBoo[randoY][randoX] = true;
    }
    return tabBoo;
};



var demineur = function(largeur,hauteur,nbMines) {
    
    //prepare la grille
    setScreenMode(largeur*images[0][0].length,hauteur
                  *images[0][0].length);
    
    //affiche la grille de depart
    for(var i = 0; i < hauteur; i++) { //par ligne
        
        for(var j = 0; j < largeur; j++) { //par colonne
            
            afficherImage(j,i,colormap,images[11]);
        }
    }
    //Cas special avec largeur, hauteur et nbMines = 0
    while(largeur == 1 && hauteur == 1) {
        
        	var coordonnee = attendreClic();
        	afficherImage(coordonnee.x,coordonnee.y
                          ,colormap,images[10]);
        	pause(0.0001);
        	alert('Vous avez perdu! Dommage! ):');
        	break;
    }
    
    if(largeur != 1 && hauteur != 1) {
        
    var coordonnee = attendreClic();
    //place les mines dans le jeu
    var tabBoo = placerMines(largeur,hauteur,nbMines,
                             coordonnee.x,coordonnee.y);
    }
    
    /*boucle qui sert a continuer a devoiler 
    les cases par rapport aux prochains clics*/
    while(largeur != 1 && hauteur != 1) {
        
        var coordonnee = attendreClic();
        
        /*il y a une mine sous la tuile cliquee
        et ca permet d'afficher toutes les mines*/
        if(tabBoo[coordonnee.y][coordonnee.x]==true) {
            
            for(var i = 0; i < hauteur; i++) {
                
            	for(var j = 0; j < largeur; j++) {
                    
            		if(tabBoo[i][j] == true) {
                        
                    	afficherImage(j,i,colormap
                                      ,images[9]);
                    }
                }
            }
            
            //affiche la mine rouge cliquee
            afficherImage(coordonnee.x,coordonnee.y
                          ,colormap,images[10]);
            pause(0.0001);
            alert('Vous avez perdu! Dommage! ):');
            break;
        }
        
        //calcul des mines aux alentours
    	var attention = 0;
        
        for(var j = -1; j < 2; j++) {
            
            for(var i = -1; i < 2; i++) {
                
                if(coordonnee.x+i >=0 
                   && coordonnee.x+i < largeur 
                   && coordonnee.y+j >=0 
                   && coordonnee.y+j < hauteur && 
                   tabBoo[coordonnee.y+j][coordonnee.x+i]==true) {
                    
            		attention +=1;
                }
            }
        }
        tabBoo[coordonnee.y][coordonnee.x] = -1;
        
        //dessiner un chiffre de 1 a 9
        if(attention != 0) {
            
            afficherImage(coordonnee.x,coordonnee.y
                          ,colormap,images[attention]);
            
            //si bonne fin de jeu
            Gg:
            if(true) {
        		for(var i = 0; i < hauteur; i++) {
                    
            		for(var j = 0; j < largeur; j++) {
                        
                		if(tabBoo[i][j] == false) {
                            
                    		break Gg;
                		}
            		}
        		}
                for(var i = 0; i < hauteur; i++) {
                    
            		for(var j = 0; j < largeur; j++) {
                        
            			if(tabBoo[i][j] == true) {
                            
                    		afficherImage(j,i,colormap
                                          ,images[9]);
                    	}
                	}
            	} pause(0.0001);
            	alert('Félicitations! Vous avez gagné!');
            	break;
            }
            
            //calcul des mines aux alentours des alentours
        } else if(attention == 0) { 
            
            for(var m = coordonnee.y-1; m 
                < coordonnee.y+2; m++) {
                
            	for(var n = coordonnee.x-1; n 
                    < coordonnee.x+2; n++) {
                    
                    
                	var attention = 0;
                    
                	for(var j = m-1; j < m+2; j++) {
                        
                        for(var i = n-1; i < n+2; i++) {
                            
                            //verifie que les tuiles 
                            //soient dans les bornes
                    		if(i >=0 && i < largeur 
                               && j >=0 
                               &&j < hauteur 
                               && tabBoo[j][i]==true) {
                                
                                attention +=1; 
                            }
                        }
                    } 
                    
                    //dessin des alentours de 
                    //la tuile cliquee
                    if(m >= 0 && n >= 0 
                       && m < hauteur 
                       && n < largeur) {
                        
                        tabBoo[m][n] = -1;
                        afficherImage(n,m,colormap
                                      ,images[attention]);
                        
                        //si bonne fin de jeu
                        Gg:
                        if(true) {
                            
        					for(var i=0; i 
                                < hauteur; i++) {
                                
            					for(var j = 0; j 
                                    < largeur; j++) {
                                    
                					if(tabBoo[i][j] 
                                       == false) {
                                        
                    					break Gg;
                					}
            					}
        					}
                        	for(var i = 0; i 
                                < hauteur; i++) {
            					for(var j = 0; j 
                                    < largeur; j++) {
            						if(tabBoo[i][j] 
                                       == true) {
                    					afficherImage(j,i,colormap
                                                      ,images[9]);
                    				}
                				}
            				}
            				alert('Félicitations! Vous avez gagné!');
            				break;
                    	}
                        
                    } else {
                        
                        continue;
                    }
                }
            }
        }
    }
};

var testDemineur = function(){
 
    //tests pour afficherImage
    setScreenMode(2,2);
    assert(exportScreen(afficherImage(0,0,colormap,[[0,0],[0,0]])) == 
           "#c0c0c0#c0c0c0\n#c0c0c0#c0c0c0");
    
    assert(exportScreen(afficherImage(0,0,colormap,[[1,2],[3,4]])) == 
           "#0000ff#008000\n#ff0000#000080");
    
	assert(exportScreen(afficherImage(0,0,colormap,[[1,1],[1,1]])) == 
           "#0000ff#0000ff\n#0000ff#0000ff");
    
	assert(exportScreen(afficherImage(0,0,colormap,[[1,2]])) == 
           "#0000ff#008000\n#0000ff#0000ff");

    setScreenMode(4,4);
    //impossible de couper la ligne en moins de 80 caractères !
	assert(exportScreen(afficherImage(1,0,colormap,[[0,0],[0,0]])) == 
           "#000000#000000#c0c0c0#c0c0c0\n#000000#000000#c0c0c0#c0c0c0\n#000000#000000#000000#000000\n#000000#000000#000000#000000");
    
	assert(exportScreen(afficherImage(1,0,colormap,[[1,2],[3,4]])) == 
           "#000000#000000#0000ff#008000\n#000000#000000#ff0000#000080\n#000000#000000#000000#000000\n#000000#000000#000000#000000");
    
    assert(exportScreen(afficherImage(1,1,colormap,[[9,9],[4,4]])) == 
           "#000000#000000#0000ff#008000\n#000000#000000#ff0000#000080\n#000000#000000#ffffff#ffffff\n#000000#000000#000080#000080");
    
	//test pour placerMines
	assert(placerMines(2,2,3,0,0)==
           'false,true,true,true');
    
    assert(placerMines(3,3,8,2,1)==
           'true,true,true,true,true,false,true,true,true');
    
    assert(placerMines(2,2,1,0,0)==
           'false,true,false,false' 
           || 'false,false,true,false' 
           || 'false,false,false,true');
    
    assert(placerMines(3,3,8,0,0)!=
           'true,true,false,true,true,true,true,true,true'
           || 'true,false,true,true,true,true,true,true,true');
    
    assert(placerMines(2,2,1,0,0)=='false,false,true,false' 
           || 'true,false,false,false' 
           || 'false,true,false,false' 
           || 'false,false,false,true');
};

testDemineur();