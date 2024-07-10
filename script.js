$('.search-button').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=43fcd7a5&s=' + $('.input-keyword').val(),
        success: result => {
            const movies = result.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);
    
            // ketika tombol detail diklik
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=43fcd7a5&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m);
                    $('.modal-body').html(movieDetail)
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                })
            })
    
    
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});



function showCards(m){
    return `<div class="col-md-3 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#showDetail" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>  
            </div>`
    
}


function showMovieDetail(m){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-5">
                        <img src="${m.Poster}" alt="" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} </h4><span class="text-body-secondary"><h5>${m.Year}</h5></span></li>
                            <li class="list-group-item"><strong>Director : </strong><br> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong><br> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong><br> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong><br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}

