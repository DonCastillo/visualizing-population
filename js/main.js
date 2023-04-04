function TimelineCard(data, index, target) {
    let html = `
        <div class="timeline-card">
            <div class="timeline-card__header">
                <div class="timeline-card__title">
                    <div><small>${data.start} - ${data.end}</small></div>
                    <div class="timeline-card__heading">${data.title}</div>
                </div>
                <div class="timeline-card__count" id="person-count-${index}b"></div>
            </div>
            <div class="timeline-card__body">
                <div class="timeline-card__time text-center flex-center-center" style="max-width: ${(data.length / 400) * 100}%;">${data.length}<br>years</div>
                
            </div>
        </div>
    `
    target.append(html)
}



function DrawPerson(count, target) {
    target.html();
    let html = "";
    for(let i = 0; count > i; ++i) {
        html += `<i class="fa-solid fa-person"></i>`
    }
    target.html(html)
}


function ObserveBarYear() {
    const bar = $('.timeline-card__time')
    const observer = new IntersectionObserver(entry => {
        if(entry[0].isIntersecting) {
            $(entry[0].target).addClass('animation-elongate')
        } else {
            bar.removeClass('animation-elongate')
        }
    });

    $(bar).each(function (index, element) {
        observer.observe(element)               
    });
}


function ObservePeople() {
    const bar = $('.timeline-card__time')
    const observer = new IntersectionObserver(entry => {

        const count = $('.timeline-card__count')
        if(entry[0].isIntersecting) {

            // $(entry[0].target).addClass('animation-elongate')
            $(entry[0].target).parent().parent().find('.timeline-card__count').addClass('animation-people-up')
        } else {
            count.removeClass('animation-people-up')
        }
    });

    $(bar).each(function (index, element) {
        observer.observe(element)               
    });
}



function PopulatePopDistribution() {
    console.log('populate distribution')
    $('.pop-distribution').html();
    let totalCells = 36
    let html = ""
    for(let i = 0; totalCells > i; ++i) {
        html += `<div class="pop-cell pop-cell-${i + 1}"></div>`
    }
    $('.pop-distribution').html(html)
}




$(document).ready(function () {
    $('#timeline').html()

    $.getJSON("./js/data/population-timeline.json", function (data, textStatus, jqXHR) {
            data = data.data
            for (let i = 0; data.length > i; i++) {
                TimelineCard(data[i], i + 1, $('#timeline'))
                DrawPerson(data[i].count, $(`#person-count-${i + 1}b`))
            }

            ObserveBarYear();
            // ObservePeople();
        }
    );

    // PopulatePopDistribution()

});