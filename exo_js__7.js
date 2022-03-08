//fonctions sur les listes et les fonctions sur les paires pointées
function list(vv1,vv2){
    return {"v1": vv1,"v2": vv2};}
function car(l){
    return l["v1"];}
function cdr(l){
    return l["v2"];}
const nil={};
function head(list1){
    return car(list1);}
function tail(list1){
    return cdr(list1);}
function iE(list0){
    return list0===nil;}
//v1 et v2 cest les car cdr et leurs valeurs
//en arguments cons cest _car et _cdr.
let aList = list(1, list(2, nil));
let anotherList = list(3, tail(aList));
console.log(aList);//cons cest construct LIST from pointed pairs model=>cons|.
console.log(anotherList);
console.log("*******************");
//debut --exo1/
const _=require("underscore");
function list_to_array(l){
    if(iE(l)) return [];
    return [head(l)].concat(list_to_array(tail(l)));}
//console.log(list_to_array(aList));
function array_to_list(tabl){
    if(tabl.length===0) return nil;
    return list(tabl[0],array_to_list(tabl.slice(1)));}
function listMap(l,f){
    return array_to_list(_.map(list_to_array(l),(e)=>f(e)));}
let g1=(n)=>n+1;
console.log(listMap(aList,g1));
console.log(listMap(anotherList,g1));
const alist = list(1, list(-1, list(2, nil)));
console.log(list_to_array(listMap(alist,(x) => x+1))); // → [2,0,3]
console.log("qst2>");
let l2sqrt=(l)=>listMap(l,(x)=>Math.pow(x,2));
console.log(l2sqrt(alist),list_to_array(l2sqrt(anotherList)));
let atl=(tabl)=>(tabl.length===0)?nil:list(tabl[0],atl(tabl.slice(1)));
console.log(atl([1,2,3]));
let lta=(l)=>(l===nil)?[]:[head(l)].concat(lta(tail(l)));
console.log(lta(alist));
function lM(l,f){
    if(l===nil) return l;
    else return list(f(head(l)),lM(tail(l),f));}
function lmS(l){
    return lM(l,(x)=>Math.pow(x,2));}
console.log(lM(alist,g1));
console.log(lmS(alist));
console.log("fin exo1;debut exo2/;>>");
//les instances ne se modifient pas car immuables donc passage par valeur!!!
function lFl(liste,f,init){
    if(liste===nil) return init;
    else return lFl(tail(liste),f,f(init,head(liste)));}
let l1=list(1,list(2,list(3,nil)));
console.log(lFl(l1,(x,y)=>x+y,0));
function lFr(liste,f,init){
    if(liste===nil) return init;
    else return f(lFr(tail(liste),f,init),head(liste));}
console.log(lFr(l1,(x,y)=>y,0),lFl(l1,(x,y)=>y,0));
let FL=(l,f,init)=>_.reduce(lta(l),f,init);
let FR=(l,f,init)=>(l===nil)?init:f(_.reduce(tail(l),f,init),head(l));
console.log(l1);
console.log(FL(l1,(x,y)=>y,0));
console.log(FR(l1,(x,y)=>y,0));
console.log("qst2:");
function lAF(l1,l2){
    return _.reduce(lta(l2),(e,F)=>e.concat([F]),lta(l1));}
let l2=list(4,list(5,list(6,list(7,nil))));
console.log(l1,lta(l2),lAF(l1,l2));
function tailN(l,n){//recupere la derniere paire pointee
    if(tail(l)===nil) return l;
    return tailN(tail(l),n+1);}
let tN=(l)=>(tail(l)===nil)?l:tN(tail(l));
console.log(tailN(l1,0),tailN(l2,0));
function lfrom(l,v){//ajout au debut
    if(l===nil) return list(v,nil);
    else return list(v,l);}
function retrait_fin(l){
    if(tail(l)===nil) return nil;
    return list(head(l),retrait_fin(tail(l)));}
function reverse(l){
    if(l===nil) return l;
    else{
	let a=head(tN(l));
	return list(a,reverse(retrait_fin(l)));}}
console.log(lta(reverse(l2)),lta(retrait_fin(l2)),lta(lfrom(l2,1)),tN(l1));
function aLS(l1,l2){
    if(l1===nil) return l2;
    else return lfrom(aLS(tail(l1),l2),head(l1));}
let al=(l1,l2)=>(l1===nil)?l2:list(head(l1),al(tail(l1),l2));
console.log(lta(al(l1,l2)));
console.log(lta(aLS(l1,l2)));
//fonctions difficiles: retrait a la fin et tNAUSSI + ''reverse''
//mais lfrom(l,v) est facile car vaut list(v,l).
let aL=(l1,l2)=>lFl(l2,(x,y)=>(x[0])?x.concat([y]):lta(x).concat([y]),l1);
let aL2=(l1,l2)=>lta(reverse(atl(lFr(l1,(x,y)=>(x[0])?x.concat([y]):lta(x).concat([y]),reverse(l2)))));
console.log(aL(l1,l2));
console.log(aL2(l1,l2));
console.log("qst3");
//listMapFold cad. retour de f(list:l) using Fold.//(procede de pliage
//des elements)
function listMapFold(l,f){
    return _.reduce(lta(l),(x,y)=>x.concat([f(y)]),[]);}
console.log(lta(l1),lta(l2));
console.log(listMapFold(l1,g1),listMapFold(l2,g1));
let lMF=(l,f)=>lFl(l,(x,y)=>x.concat([f(y)]),[]);
console.log(lMF(l1,(x)=>x*2));
let lMF2=(l,f)=>lFr(reverse(l),(x,y)=>x.concat([f(y)]),[]);
console.log(lMF(l2,(u)=>u*2));
console.log("qst4");
function pI(f,l){
    let ll=listMapFold(l,f);
    return _.reduce(ll,(x,y)=>x*y,1);}
let lp=list(4,list(9,list(25,nil)));
console.log(pI((x)=>Math.sqrt(x),lp));
let pi=(f,l)=>_.reduce(_.map(lta(l),(e)=>f(e)),(x,y)=>x*y,1);
console.log(pi((e)=>Math.sqrt(e),lp));
function vf_pI(f,l){
    return lFl(atl(lFl(l,(x,y)=>x.concat([f(y)]),[])),(x,y)=>x*y,1);}
console.log(vf_pI(Math.sqrt,lp));
console.log("qst5");
function lR(l){
    return _.reduce(lta(l),(x,y)=>[y].concat(x),[]);}
console.log(lp);
console.log(lR(lp));
function lR_v2(l){
    return lFr(l,(x,y)=>x.concat([y]),[]);}
console.log(lp);
console.log(lR_v2(lp));
console.log("fin de lexo 2:=>>debut exo3:::");
//avec reduce et map eventuellement:
//classiquement d'abord:>>
function nbr1(f,l,n){
    if(l===nil) return n;
    else return (f(head(l)) && nbr1(f,tail(l),n+1))||nbr1(f,tail(l),n);}
let lk=list(1,list(8,list(2,list(7,nil))));
console.log(nbr1((x)=>x>5,lk,0));
function nbr2(f,l){
    return _.reduce(_.map(lta(l),(e)=>f(e)),(x,y)=>(y)?x+y:x,0);}
console.log(lta(lk));
console.log(nbr2((x)=>x>5,lk));
console.log(lta(lk));
//listMap l,f et retourne une liste
//lFl & lFr prennent une liste,une fonction a 2 entrees et un init.//////
function nbr3(f,l){
    return lFl(listMap(l,f),(x,y)=>(y)?x+y:x,0);}
console.log(lta(lk),nbr3((x)=>x>5,lk));
console.log("fin exo3=>debut de l'exo4 dernier::>>>");
//construction d'une matrice===liste de vecteurs listes lignes.//
let line1=list(1,list(2,list(3,nil)));
let line2=list(4,list(5,list(6,nil)));
let line3=list(7,list(8,list(9,nil)));
let matrix1=list(line1,list(line2,list(line3,nil)));
let matrix12=list(lta(line1),list(lta(line2),list(lta(line3),nil)));
console.log(lta(matrix12));
console.log("QST 1 :");
function ps1(v1,v2,n){
    if(v1===nil) return n;
    else return ps1(tail(v1),tail(v2),n+head(v1)*head(v2));}
console.log(ps1(line1,line2,0));
function indexof(tab,v,n){
    if(tab.length===0) return null;
    else return (tab[0]!==v && indexof(tab.slice(1),v,n+1))|| n;}
console.log(indexof(lta(line1),2,0));
console.log(indexof(lta(line1),3,0));console.log(indexof(lta(line1),1,0));
function ps2(v1,v2){
//y doit se multiplier par lta(v2)[indexof(lta(v1),y)].
    return _.reduce(lta(v1),(x,y)=>x+y*lta(v2)[indexof(lta(v1),y,0)],0);}
console.log(lta(line1),lta(line2));
console.log(ps2(line1,line2));
function ary_bis(n){
    if(n===0) return [];
    return [n-1].concat(ary_bis(n-1));}
function ary(n){
    return lta(reverse(atl(ary_bis(n))));}
console.log(ary(4));//de 1 à 4.///
//devient 0,1,2,3 qui est la liste d'indices pour une liste de length===4.
function ps3(v1,v2){
    let ti=ary(lta(v1).length);
    let li=listMap(v2,(e)=>e*lta(v1)[indexof(lta(v2),e,0)]);
    return lFl(li,(x,y)=>x+y,0);}
console.log(ps3(line1,line2));
//probleme de l'indexof pouvant(PAS SUR) etre mis VIA listMap;(lFl,lFr)
function indexof_vA(l,v){
    let l1=listMap(l,(e)=>e===v);
    let t2=lFl(l1,(x,y)=>(x[x.length-1])?x:x.concat([y]),[]);
    return t2.length-1;}
console.log(indexof_vA(line1,2));
console.log(indexof_vA(line1,3));
console.log(indexof_vA(line1,1));
//mode direct suivant ps3=>ps3_vf:>>
function ps3_vf(v1,v2){
    let iO_va=(l,v)=>lFl(listMap(l,(e)=>e===v),(x,y)=>(x[x.length-1])?x:x.concat([y]),[]).length-1;
    return lFl(v1,(x,y)=>x+y*lta(v2)[iO_va(v1,y)],0);}
console.log(lta(line1),lta(line2));
console.log(ps3_vf(line1,line2));
console.log("qst2");
function retrait_first_column(m){//equivalent d'un tail### pour les 'listes'./
    return listMap(m,(e)=>tail(e));}
console.log(lta(matrix1));
console.log(lta(retrait_first_column(matrix1)));
function column(m,n){
    if(n===0) return atl(lFl(m,(x,y)=>x.concat([head(y)]),[]));
    else return column(retrait_first_column(m),n-1);}
console.log(lta(matrix1));
console.log(lta(column(matrix1,0)));
console.log(lta(column(matrix1,1)));
console.log(lta(column(matrix1,2)));
let iO_va=(l,v)=>lFl(listMap(l,(e)=>e===v),(x,y)=>(x[x.length-1])?x:x.concat([y]),[]).length-1;
function pvm(m,v){
    return listMap(v,(e)=>ps3_vf(v,column(m,iO_va(v,e))));}
console.log(lta(matrix1),lta(line1));
console.log(lta(pvm(matrix1,line1)));//qui vaudra: 30,36,42 ((apres lta)).///
console.log("qst3:>>");
function transpose_v1(m,n){//n est la taille de la matrice carree
//soit la longueur du vecteur liste de n'importe quelle ligne.
    if(n===0) return nil;
    else{
	let mn=lta(head(m)).length;
	return list(column(m,mn-n),transpose_v1(m,n-1));}}
console.log(lta(matrix1));
console.log(lta(transpose_v1(matrix1,3)));
function t_v2(m){
    return listMap(m,(e)=>column(m,iO_va(m,e)));}
console.log(lta(matrix1));
console.log(lta(t_v2(matrix1)));
console.log("qst4");
function line(m,n){//ligne numero n.
    return column(t_v2(m),n);}
console.log(lta(matrix1));
console.log(lta(line(matrix1,2)));
function pM(m1,m2,n){
    if(n===0) return nil;
    else{
	let mn=lta(line(m1,n)).length;
	return list(pvm(m2,line(m1,mn-n)),pM(m1,m2,n-1));}}
let ln1=list(0,list(1,list(3,nil)));
let ln2=list(0,list(0,list(4,nil)));
let ln3=list(2,list(0,list(1,nil)));
let matrix2=list(ln1,list(ln2,list(ln3,nil)));
console.log(lta(matrix1));
console.log(lta(matrix2));
console.log(lta(pM(matrix1,matrix2,3)));
let tabl__1=lta(pM(matrix1,matrix2,3));
let tabl02=head(tail(tail(tabl__1[0])));
console.log(tabl02);
let tabl02_2=head(tail(tail(tabl__1[1])));
console.log(tabl02_2);
let tabl02_3=head(tail(tail(tabl__1[2])));
console.log(tabl02_3);
function mP(m1,m2){
    return listMap(m1,(e)=>pvm(m2,e));}
console.log(lta(matrix1),lta(matrix2));
console.log(lta(mP(matrix1,matrix2)));
console.log("*****************************************");
//FIN DU TD7.//