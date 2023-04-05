function TimelineCard(data, index, target) {
    let html = `
        <div class="timeline-card">
            <div class="timeline-card__header">
                <div class="timeline-card__title">
                    <div><small>${data.start} - ${data.end}</small></div>
                    <div class="timeline-card__heading lab-djr-font lab-djr-regular-pixel">${data.title}</div>
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
    const pyramidStep = $('.pop-pyramid .animate-pyr')
    console.log(pyramidStep)

    const observer = new IntersectionObserver(entry => {
        const target = $(entry[0].target)[0]
        const ident = parseInt(target.id)
        
        if(entry[0].isIntersecting) {
            // $(entry[0].target).find('.pop-growth__stat').addClass('animate-slide-up')
           

            $(entry[0].target).addClass(`animate-pyr-${ident}`)
            // $(entry[0].target).addClass(`animate-pyr-${ident}`)
            // $(entry[0].target).removeClass(`animate-pyr`)

            console.log(ident)
        } else {
            // $('.pop-growth__stat').removeClass('animate-slide-up')
            pyramidStep.$(entry[0].target).removeClass(`animate-pyr-${ident}`)
        }
    });

    $(pyramidStep).each(function (index, element) {
        observer.observe(element)  
    });
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