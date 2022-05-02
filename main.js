let sidebarbtn = document.querySelector('.sidebarbtn')
let sidebar = document.querySelector('.mobbar')
let link = document.querySelectorAll('a')
let mdl = document.querySelector('li')
let historys = document.querySelector('.cards')
let mission = document.querySelector('.mcard')
let rocket = document.querySelector('.rcard')
let lpad = document.querySelector('.lcard')
let body = document.querySelector('body')
let _ = undefined

sidebarbtn.addEventListener('click', () => {
	if (sidebar.style.left === '-70%') {
		sidebar.style.left = '0%'
	}
	else {
		sidebar.style.left = '-70%'
	}
})
sidebar.onclick = () => {
	sidebar.style.left = '-70%'
}



// Components //

function build(element, clss, inner, id) {
	let el = document.createElement(element)
	el.className = clss
	el.setAttribute('id', id)
	el.innerHTML = inner
	return el
}

function image(src, clss) {
	let img = document.createElement('img')
	img.setAttribute('src', src)
	img.className = clss
	return img
}

function anchor(href) {
	let a = document.createElement('a')
	a.setAttribute('href', href)
	return a
}

function append(parent, child) {
	parent.appendChild(child)
}

// component ends here //

// History section //
{
	fetch('https://api.spacexdata.com/v3/history')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			data.forEach(e => {
				let article = e.details
				let arr = article.split(' ')
				if (arr.length > 20) {
					arr.length = 20
					var newarticle = arr.join(' ')
					var details = newarticle + ' ...show more'

				}
				else {
					details = e.details
				}
				let cards = build('div', 'cards', '', _) //gp
				let card = build('div', 'card', '', _)
				let txt = build('div', 'txt', '', _) //cc
				let img = build('div', 'img', '', _) //cc
				let p1 = build('p', 'date', 'Date: ' + e.event_date_utc, _)
				let h3 = build('h3', 'title2', e.title)
				let para = build('p', 'para1', details)
				let imgbox = image('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Falcon_1_Flight_4_liftoff.jpg/220px-Falcon_1_Flight_4_liftoff.jpg', 'himg')
				// append
				historys.appendChild(cards)
				append(cards, card)
				append(card, txt)
				append(card, imgbox)
				append(txt, p1)
				append(txt, h3)
				append(txt, para)

				card.addEventListener('click', () => {
					let modal = build('div', 'cardModal', '')
					let mtxt = build('div', 'modal', '')
					let p = build('p', 'para1', e.details)
					let h3 = build('h3', 'title2', e.title)
					append(modal, mtxt)
					append(historys, modal)
					append(mtxt, h3)
					append(mtxt, p)
					modal.onclick = () => {
						modal.remove()
					}
				})
			})

		})
}


// mission section //
{
	fetch('https://api.spacexdata.com/v3/missions')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			data.forEach(e => {
				let article = e.description
				let arr = article.split(' ')
				if (arr.length > 30) {
					arr.length = 30
					var newtxt = arr.join(' ')
					var description = newtxt + ' ...show more'

				}
				else {
					description = e.description
				}

				let cards = build('div', 'mcards gridcards', '', _) //gp
				let card = build('div', 'card', '', _)
				let img = build('div', 'img', '', _) //cc
				let imgbox = image('https://images.unsplash.com/photo-1541185933-55ad9888f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'mimg')
				let h3 = build('h3', 'title2', 'Mission Name: ' + e.mission_name)
				let p1 = build('p', 'para1', description, _)
				let para = build('p', 'para2', 'Manufacturer : ' + e.manufacturers[0])
				let button = build('button', 'btn', '')
				let a = build('a', '', 'Learn More.')
				a.setAttribute('href', e.wikipedia)

				/// append

				append(mission, cards)
				append(cards, card)
				append(card, img)
				append(card, h3)
				append(card, p1)
				append(card, para)
				append(card, button)
				append(button, a)
				append(img, imgbox)


				card.addEventListener('click', () => {
					let modal = build('div', 'cardModal', '')
					let mtxt = build('div', 'modal', '')
					let p = build('p', 'para1', e.description)
					let h3 = build('h3', 'title2', e.mission_name)
					append(modal, mtxt)
					append(historys, modal)
					append(mtxt, h3)
					append(mtxt, p)
					modal.onclick = () => {
						modal.remove()
					}
				})
			})
		})

}

// rockets //


{
	fetch('https://api.spacexdata.com/v3/rockets')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			data.forEach(e => {

				let cards = build('div', 'mcards gridcards', '', _) //gp
				let card = build('div', 'card', '', _)
				let img = build('div', 'img', '', _) //cc
				let imgbox = image(e.flickr_images[1], 'mimg')
				let h3 = build('h3', 'title2', 'Name: ' + e.rocket_name)
				let p1 = build('p', 'para1', e.description, _)
				let para = build('p', 'para2', 'Company : ' + e.company)
				let button = build('button', 'btn', '')
				let a = build('a', '', 'Learn More.')
				a.setAttribute('href', e.wikipedia)

				/// append

				append(rocket, cards)
				append(cards, card)
				append(card, img)
				append(card, h3)
				append(card, p1)
				append(card, para)
				append(card, button)
				append(button, a)
				append(img, imgbox)


				card.addEventListener('click', () => {
					let info = build('div', 'rocketInfo cardModal', '')
					let m = build('div', 'modal', '')
					let ttl = build('h1', 'title1', 'Rocket Info')
					let infos = build('div', 'infos', `
								<p class="row"><span>Cost per launch</span> <span>${e.cost_per_launch} $</span></p>
								<p class="row"><span>Success Rate</span> <span>${e.success_rate_pct} %</span></p>
								<p class="row"><span>First launch</span> <span>${e.first_flight}</span></p>
								<p class="row"><span>Company</span> <span>${e.company}</span></p>
								<p class="row"><span>Height</span> <span>${e.height.meters} M</span></p>
								<p class="row"><span>Diameter</span> <span>${e.diameter.meters} M</span></p>
								<p class="row"><span>Mass</span> <span>${e.mass.kg} kg</span></p>
								<p class="row"><span>Engine</span> <span>${e.engines.type}</span></p>
								<p class="row"><span>Propellant 1</span> <span>${e.engines.propellant_1}</span></p>
								<p class="row"><span>propellant 2</span> <span>${e.engines.propellant_2}</span></p>
								<button class="mbtn btn">DONE</button>
				`)
					append(info, m)
					append(rocket, info)
					append(m, ttl)
					append(m, infos)
					info.onclick = () => {
						info.remove()
					}
					info.addEventListener('click', () => {
						modal.style.visibility = 'hidden'
						modal.style.opacity = '0'
					})
				})
			})
		})

}

// launch pad //

{
	fetch('https://api.spacexdata.com/v3/launchpads')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			data.forEach(e => {

				let cards = build('div', 'lcards', '', _) //gp
				let card = build('div', 'card mb', '', _)
				let h3 = build('h3', 'title2', 'Name: ' + e.name)
				let p2 = build('p', 'para2', e.status, _)
				let para = build('p', 'para1 lp', 'Vehicles launched : ' + e.vehicles_launched[0])
				let para2 = build('p', 'para1 lp', 'Total Attempt : ' + e.attempted_launches)
				let para3 = build('p', 'para1 lp', 'Successfull Attempt : ' + e.successful_launches)
				let detl = build('p', 'para1', e.details)
				let button = build('button', 'btn', '')
				let a = build('a', '', 'Learn More.')
				a.setAttribute('href', e.wikipedia)

				/// append

				append(lpad, cards)
				append(cards, card)
				append(card, h3)
				append(card, p2)
				append(card, para)
				append(card, para2)
				append(card, para3)
				append(card, detl)
				append(card, button)
				append(button, a)


				p2.addEventListener('click', () => {
					let modal = build('div', 'cardModal', '')
					let mtxt = build('div', 'modal', '')
					let p = build('p', 'para1', e.description)
					let h3 = build('h3', 'title2', e.mission_name)
					append(modal, mtxt)
					append(history, modal)
					append(mtxt, h3)
					append(mtxt, p)
					modal.onclick = () => {
						modal.remove()
					}
				})
			})
		})
}
/*
		<div class="lcard">
			<div class="card">
				<h3 class="title2">Omlek island, Marshall</h3>
				<p class="para2">retired</p>
				<p class="para1">vehicles launched - Falcon 1</p>
				<p class="para1">Total attempt - 5</p>
				<p class="para1">Successful attempt - 2</p>
				<h2 class="title2">Space Exploration Technologies Corp. (SpaceX) is an American aerospace manufacturer</h2>
				<button class="btn"><a href="#">Learn More.</a></button>
			</div>
		</div>
	*/
