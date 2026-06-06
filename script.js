let chart;

function generateRandomArray(){

let size = 1000;

let arr = [];

for(let i=0;i<size;i++){
arr.push(Math.floor(Math.random()*10000));
}

document.getElementById("numbers").value = arr.join(",");
}

function bubbleSort(arr){

let a = [...arr];

for(let i=0;i<a.length-1;i++){

for(let j=0;j<a.length-i-1;j++){

if(a[j] > a[j+1]){

[a[j],a[j+1]]=[a[j+1],a[j]];
}

}
}

return a;
}

function mergeSort(arr){

if(arr.length<=1)
return arr;

let mid=Math.floor(arr.length/2);

let left=mergeSort(arr.slice(0,mid));
let right=mergeSort(arr.slice(mid));

return merge(left,right);
}

function merge(left,right){

let result=[];

while(left.length && right.length){

if(left[0] < right[0]){
result.push(left.shift());
}
else{
result.push(right.shift());
}

}

return [...result,...left,...right];
}

function quickSort(arr){

if(arr.length<=1)
return arr;

let pivot=arr[arr.length-1];

let left=[];
let right=[];

for(let i=0;i<arr.length-1;i++){

if(arr[i]<pivot)
left.push(arr[i]);
else
right.push(arr[i]);

}

return [...quickSort(left),pivot,...quickSort(right)];
}

function compareSorts(){

let input=document.getElementById("numbers").value;

let arr=input
.split(",")
.map(x=>Number(x.trim()));

if(arr.some(isNaN) || arr.length===0){

alert("Enter valid numbers");
return;
}

document.getElementById("stats").innerHTML=
`
<h3>Array Size: ${arr.length}</h3>
`;

let start,end;

start=performance.now();
bubbleSort(arr);
end=performance.now();
let bubble=(end-start).toFixed(4);

start=performance.now();
mergeSort(arr);
end=performance.now();
let merge=(end-start).toFixed(4);

start=performance.now();
quickSort(arr);
end=performance.now();
let quick=(end-start).toFixed(4);

let winner="Bubble Sort";

let min=Math.min(bubble,merge,quick);

if(min==merge)
winner="Merge Sort";

if(min==quick)
winner="Quick Sort";

document.getElementById("result").innerHTML=
`
<h2>Results</h2>

<table>

<tr>
<th>Algorithm</th>
<th>Time (ms)</th>
<th>Complexity</th>
</tr>

<tr>
<td>Bubble Sort</td>
<td>${bubble}</td>
<td>O(n²)</td>
</tr>

<tr>
<td>Merge Sort</td>
<td>${merge}</td>
<td>O(n log n)</td>
</tr>

<tr>
<td>Quick Sort</td>
<td>${quick}</td>
<td>O(n log n)</td>
</tr>

</table>

<h2 style="margin-top:20px;">
🏆 Fastest Algorithm: ${winner}
</h2>
`;

drawChart(bubble,merge,quick);
}

function drawChart(bubble,merge,quick){

let ctx=document.getElementById("chart");

if(chart){
chart.destroy();
}

chart=new Chart(ctx,{
type:'bar',
data:{
labels:[
'Bubble Sort',
'Merge Sort',
'Quick Sort'
],
datasets:[{
label:'Execution Time (ms)',
data:[
bubble,
merge,
quick
]
}]
},
options:{
responsive:true,
plugins:{
legend:{
display:true
}
}
}
});
}