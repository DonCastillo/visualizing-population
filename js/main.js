function TimelineCard(data, index, target) {
    let html = `
        <div class="timeline-card">

            <div class="timeline-card__header">
                <div class="timeline-card__title">
                    <div><small>${data.start} - ${data.end}</small></div>
                    <div class="timeline-card__length roboto-font"><strong>${data.lengthtext}</strong> yrs before it got to</div>
                    <div class="timeline-card__heading lab-djr-font lab-djr-regular-pixel">${data.title}</div>
                </div>
                <div class="timeline-card__count" id="person-count-${index}b"></div>
            </div>

            <div class="timeline-card__body">
                <div class="timeline-card__time text-center flex-center-center" style="max-width: ${(data.length / 300) * 100}%;"></div>    
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
    const bar = $('.timeline-card__body')
    const observer = new IntersectionObserver(entry => {
        if(entry[0].isIntersecting) {
            $(entry[0].target)
                .find('.timeline-card__time')
                .addClass('animation-elongate')
        }
    });

    $(bar).each(function (index, element) {
        observer.observe(element)               
    });
}





function ObservePopGrowth() {
    const popGrowthBar1 = $('.pop-growth__bar--1')[0]
    const popGrowthBar2 = $('.pop-growth__bar--2')[0]

    const observer = new IntersectionObserver(entry => {
        if(entry[0].isIntersecting) {
            $(entry[0].target).find('.pop-growth__stat').addClass('animate-slide-up')
        } else {
            $('.pop-growth__stat').removeClass('animate-slide-up')
        }
    });

    observer.observe(popGrowthBar1)
    observer.observe(popGrowthBar2)
}


function ObservePyramid() {
    const pyramid = $('.pop-pyramid')[0]

    const observer = new IntersectionObserver(entry => {

        const pyramidSteps = $(entry[0].target).find('.pyr')

        if(entry[0].isIntersecting) {

            $(pyramidSteps).each(function (index, element) {
                const pyramidRow = $(element) 
                const id = pyramidRow.attr('id')
                pyramidRow.addClass(`animate-pyr-${id}`)
            });

        } else {

            $(pyramidSteps).each(function (index, element) {
                const pyramidRow = $(element) 
                const id = pyramidRow.attr('id')
                pyramidRow.removeClass(`animate-pyr-${id}`)
            });
        }
    });
    observer.observe(pyramid)
}


function DrawHearts(count, target) {
    target.html()
    let html = ""
    for(let i = 0; count > i; ++i) {
        html += `<i class="fa-solid fa-heart-pulse"></i>`
    }
    target.html(html)
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
        }
    );

    ObservePopGrowth();
    DrawHearts(47, $('#heart-count-1'))
    DrawHearts(73, $('#heart-count-2'))
    ObservePyramid();
});