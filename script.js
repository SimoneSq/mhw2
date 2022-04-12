/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const CHECK_IMG = 'images/checked.png';
const UNCHECK_IMG ='images/unchecked.png';
const list=[];

function Reset(){
    const titolo=document.querySelector('#result h1');
    titolo.textContent='';
    const testo=document.querySelector('#result p');
    testo.textContent='';
    // Nascondo il risultato
    const result = document.querySelector('#result');
    result.classList.add('hidden');
    //Rendo tutto cliccabile
    const boxes = document.querySelectorAll('.choice-grid div');
    for(const box of boxes){
        box.classList.remove('checked');
        box.classList.remove('unchecked');
        const image = box.querySelector('.checkbox');
        image.src = UNCHECK_IMG;
        box.addEventListener('click',Check);
    }
}

function Check(event){
    const container = event.currentTarget;
    const image = container.querySelector('.checkbox');
    image.src = CHECK_IMG;

    if(!container.querySelector('unchecked')){
        container.classList.remove('unchecked');
    }

    container.classList.add('checked');
    UnCheck(container.dataset.questionId,container.dataset.choiceId);
    ContaCheck();
}

function UnCheck(id,cont){
    const allBoxes = document.querySelectorAll('.choice-grid div');
    for (const box of allBoxes){
        if(box.dataset.questionId == id && box.dataset.choiceId != cont){
            if(!box.querySelector('checked')){
                box.classList.remove('checked');
            }
            box.classList.add('unchecked');
            const image = box.querySelector('.checkbox');
            image.src = UNCHECK_IMG;
        }
    }
}

function CambiaTesto(indice){
    const titolo=document.querySelector('#result h1');
    titolo.textContent=RESULTS_MAP[list[indice]].title;
    const testo=document.querySelector('#result p');
    testo.textContent=RESULTS_MAP[list[indice]].contents;
}

function StampaPersonalita(){
    let contaPers=[];
    let max=0;
    let indice=0;
    for(let i=0;i<list.length;i++){
        contaPers[i]=0;
        for(let j=0;j<list.length;j++){
            if(list[i]==list[j])
                contaPers[i]++;
                if(max<contaPers[i]){
                    max=contaPers[i];
                    indice=i;
                }
        }
    }
    if(max==1)
        indice=0;
    CambiaTesto(indice);
}

function BloccaRisposte(){
    const boxes = document.querySelectorAll('.choice-grid div');
    for(const box of boxes){
      box.removeEventListener('click',Check);
    }
    const result = document.querySelector('.hidden');
    result.classList.remove('hidden');
    StampaPersonalita();
}

function ContaCheck(){
    let cont=0;
    const aboxes = document.querySelectorAll('.choice-grid div');
    for(const allbox of aboxes){
        if(allbox.className === 'checked'){
            cont++;
            list[cont-1]=allbox.dataset.choiceId;
        }
    }
    if(cont>2){
        BloccaRisposte();
      /*  for(let i=0;i<list.length;i++)
            console.log(RESULTS_MAP[list[i]]);*/
    }
}

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click',Check);
}
const button=document.querySelector('button');
button.addEventListener('click',Reset);