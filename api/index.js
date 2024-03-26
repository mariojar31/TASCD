const getVerse= async(version, book, chapter, verse)=>{
    
    const url = 'https://apitascd.vercel.app/bible/'+version+'/'+book+'/'+chapter+'/'+verse;

    try{
        const response = await fetch(url);
        const text = await response.json();
    
        return text;

    }catch(error){
        console.error('No se pudo realizar la solicitud. Error: ',error);
    }
}

const getBooks = async(version)=>{
    const url= 'https://apitascd.vercel.app/bible/'+version;

    try{
        const response = await fetch(url);
        const data = await response.json();

        const books= data.books;
        const bookList = [];

        books.map(book=>bookList.push(book.book));

        return bookList;
    }catch(error){
        console.error('No se pudo realizar la solicitud. Error: ',error);
    }
}

const getChapters= async(version, book)=>{
    const url = 'https://apitascd.vercel.app/bible/'+version+'/'+book;

    try{
        const response = await fetch(url);
        const data = await response.json();
        const chapters = data.chapters;

        const chapterList = [];

        chapters.map(chapter=>chapterList.push(chapter.chapter));

        return chapterList;

    }catch(error){
        console.error('No se pudo realizar la solicitud. Error: ',error);
    }
}

const getVersesList= async(version, book, chapter)=>{
    const url = 'https://apitascd.vercel.app/bible/'+version+'/'+book+'/'+chapter;

    try{
        const response = await fetch(url);

        const data = await response.json();
        const verses= data.verses;

        return verses;

    }catch(error){
        console.error('No se pudo realizar la solicitud. Error: ',error);
    }
};

const obtainDailyReflection = async(date,time)=>{
    const url= `https://apitascd.vercel.app/devotional/search?date=${date}&time=${time}`;
    try{
        const response = await fetch(url);

        const data = await response.json();
        const res= data;

        return res;

    }catch(error){
        console.error('No se pudo realizar la solicitud. Error: ',error);
    }
};

const utilitySplit=(text)=>{
    console.log(text);
    const splitText = text.split(' ');
    let Book = '';
    let Chapter = '';
    let Verses = '';

    if (splitText.length === 2) {
        Book = splitText[0];
        Chapter = splitText[1];
        Verses = '';
    } else if (splitText.length === 3) {
        if (/^\d+$/.test(splitText[0])) {
            Book = `${splitText[0]} ${splitText[1]}`;
            Chapter = splitText[2];
            Verses = '';
        } else {
            Book = splitText[0];
            Chapter = splitText[1];
            Verses = splitText[2];
        }
    } else {
        Book = `${splitText[0]} ${splitText[1]}`;
        Chapter = splitText[2];
        Verses = splitText[3];
    }

    return([Book,Chapter,Verses])
}

export  {getVerse, getBooks, getChapters, getVersesList, obtainDailyReflection, utilitySplit};
