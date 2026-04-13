(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const starImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ4SURBVHgB7VlNctMwFP7UwrRl0/YGzgloNwyURd0TQE5AeoK2J2hyAuAEaU9QOEHMgvCzSW9QcwLChqbDNOI9RVEk106sWGZY5JvR+FlRJD29fxlYYYX/F/I79uQXxKgRAjWANh3Ro0ct0l0ptSPxQj2DYg31oIvZ5qHpLmpAcAno07+ZdWBIq+zoN5ZCgoCoQwLnhhK4oBUS8y7xGoFRhwT49CP9eqSfPb3aEBtoiH16BkJQCdDmW7AMl9VFq0w6GUCqdKvGBENoFXpj0R2LvjSUwCsERDAGtPHGVldiqBHeWf0xxwcEQkgJOMZr+3xxpHQ+Mb//CWfMIRmIDSUtlZlhplLrOJED41orIQgDecabHaP6pPY+E2OOEQChJFBkvC4E3lv0CQIgNw4o8Y6UiCNicQdjanxqQrVtQ0s9xk0bGkU5j+zR+E38tFa/1pF6aD1/GXrqfteJfkySzYkfImfjV8CS4mXjfY7jeUNkn+YXSxvxBR3Amc3II+fnEd4CS+tmQlH2bOGoO2JwC8umFS3aI8MckiuBPol3lnilqs3EyfjxQORjak/yxTsPStq/tYraKikMvY2pak769/SOhyTl3ek8j+aswb68g5qgGb4uM1Z+oxgzzg9+rheyvQTQll9xFcpfLwNeW9nMGG2r+4M9xmWAQ760BrCejjDQacI/hVqT1nYMXtDeMnYmCv7chp0asC2soymelRN5VcjPpC5ryhtGpnOMjnjpSEIhN5CR7reJNZvTCPckiT5OUTNIbU9oVwPYm5fkOnM2z5hb0OSeBNlGXcatjbVtdaX03qTNF0p+YUWWc8Mw1cXjUJWVchS3VPS7+s5RurnoJqNUSalSgI3MAnw6m9ivyoSO/lmVuaRgd1pm7lLJHOfz4gBNuIlaFKQ8HKlDicw7G+sBWmUPxisbVcYtrVixhqeojtiiO0XGWgT/dFqoED+BpNSiOlJrPu+g6c+AdEJ6gupIDLVEwe91L5S9dSOVqnyvpB3EjUkiN7Hr4xj8JBD+9CcFv7D8/MgvzfZjwBXxp0XDPa7XZ3NJvysXXxuILTopGsSbppRgwOkHvfb4unFBQpgYytMOSuuwo/+ZosKM4aB0R+mALMiZJGW7lLLnRddMMdUo+y3BRwKxtZEHuYlSFY6o9ualrtymEOq3nr6GcSGcOWOUhA8Dh5ht7KMhSTLUOFdy8yVWC4F91eBcdPGYLv2n66iVNSf95xAlsZwE9Gmp1FcqPY+tjQxpVk7C1Ccl3VqYFOKpNR/39UyKbktAlpeAjw1I65Xv/c+RFTWnGVuUbhf4cX3ibbgXYYxUzSlVBeZlBz4M9FCsmym147Kfj9Tt9P2DOiOLUgz4qFCnsJ/Tao9vX1ya0vjGnDnTsl7IL5XoU5Sc3GlGyhNR2Vn106lSK6lu66YBLEVNn2RrBZevqoRdYYUVvPAXJrOCc9SFL6sAAAAASUVORK5CYII=";
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAUCAYAAACtZULwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUdSURBVHgB7VrhcRsrEP6cyX+rBFyBlQpMKrBeBZYreHYFUip4cgVSKkhSgXgVRKlApAKrAx77AA+3t3CcpHGcmXwzjO5gF5Zd2GU5XTjnlgDsxcXFxj9r/0xl5csDulh5mgOrQ+Qfgsj72vCyOl7n5brAifDdKv+zZ9Ub3/V9ZWzS+RVeEy7g2ZetL/v4rlwfWuCdujYovAFIguEMKOhrPTD2HmdElEHnhdO8z56VL5NKf1NfjFD3B28DS1/usnfrS8dzJGPvvEv56IJLXhQ6uxbqfjdjf8KvAx/71cNaMraKhr6p0GqhrkZfhR+PvIhC36NYXw5+8e0E+o7n8TS20rdEu0G7bNMoW8Ihlt2R548Nez8UxlWQvaxFXS+XQn+qM54rxFgX4jjHhHXWi0Ol/jIeivNbN4y9L4uM70GgmUOAr18LtBPXl2/P+HSjbN99meVKFWh4zN6z9m1usCjzc8PYe9fVy9y1Yfsu8hgE//6UyWcFPU5zxQjtO1TggtFpkhrDINplphQj0JQ8i2bvZmg3urBwWmUjPXzJDX4iaGHMUT8zJSgEvTxgJJKxk/vIXcG/Av208FzjybFG24Ry0G6bRffFDdZTtqfl7pfwGcNYYDz+wYlwwVses2j+xkgkY5OCaFXPszZpl14XnhMsCoi7WgtN5E3uY3ks9HEbf7+x+onrp3Va4DeoIHopxaqtLx8RPB6VD+jLptzpaaW0aWw2bhqb20PF3wPKerdZeYnZFINoB23iO01CyqFfYlzkyfHs5NiV+tNC/VcuXaGPfWyT4tMD49+y9u9Z235Ev0tBtqVAN3cnxGwn62UrjL0R6NTQ3HK8Z6vgOb2Q2/QMtGpyt0uTmsT4x1dkNV6jv3NEHjo1u/5dR5KBFseatWmEG7/kEjVrb3HhSqi79f3dNNCdCklvOhqL2n4geKZlLC8oZSMlJGOT4fYFQTSrmzr54ukHzgeLrmL/NzYtMj+2YTLlBtFCXwbHofUOQeEExDnRgrwT+qVC8TydJ8geFPbMWEMTUsy2CEm/Ye2SAaeQFWFQx9iDWQn8EEhxO8lzy9osz0vfIryMcwT92wFSmid5tq2Ts6Eq0s4mpSxjnNJZe+mQJhnOoo4DzgOD/slZQ/ZCBqeNYxvozrKYSP8IKZVGmAd5LDKupGuFkPpdjbngScZOMYJ3bAQeLdQdYoxXGIfSble8//TgxzHCWeI2unfO1xKvO/1n+ObHWqEB7oQTeeRVrHoVjZ9SSSoL9EMbufgNGpGMnY7vCpkS42Gpd0gT+mlZ3RJN71LEyRcVnNegm5uSMjSjoQVo0IZDQbYVk+0L+jnxX5DnNvP0PxHiq0EZS/Tj9VWSKYahtJG4R6uFRhUzgp+pouVDiOQeOVoOZxZhArmA0+hRbHxPd9JD/VPczpVOfAuBphVGqJsxZV1CvvxId+YcuUwGZVihbu3H5vLfQR47geykWPu88xZzst737Kx95YYxi7TFPDu2L91xUExm1cAzZxOv5qKu7U7cVfhL99rLwti1PLsVOht/ULfvMl0oyG7hWBctYYXxB5pPPM2I73aA7yvG4R5tB7Icj9nzE45AdPHH8H5m4YF0a2sM5MaJgdz4owu7gdxF7h4M6m7owIwh0ab4Q78f4jiUJikUPnEiuOFNJXV6Qj/VSih9htyhq5CX53g+oWtJ8lJ3mWxokS1mM9R+w/hsYeycl77opXB5DXnjpXBhaHz6G1neGOd75YKXpX4umRz4Dz1my31xwGpxAAAAAElFTkSuQmCC";
const searchIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAALZJREFUeAGtkQENwzAMBK0hCIMFQiAUwiAUQhm0TDoGgVAIg5Ax6Bhk3vaVflUcRVVfekWK7XPsiJypnLNTj+qUf1rVUR1aigMKLI21Yk9dF3VH9xNBBgswIyEa8WEbyQI8kGDOSi8MpeBXUpGG70jr+f6C84UkV2FccT5L9AX0ScrdPS3SlRI6a9P43oTYLJZ23/UpiPQyvvc1SE/dNq2ApyYIjXSDHe2hHWKA/yByRAQ5BtjrDXDaZj4YxEyHAAAAAElFTkSuQmCC";
const BACKDROP_IMAGE_URL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
const THUMB_NAIL_URL = "https://media.themoviedb.org/t/p/w200";
const API_KEY = "ef788d51af1bd7b7347d34110f993300";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_PATH = "movie/popular";
const SEARCH_PATH = "search/movie";
const Header = {
  clearHeader() {
    const backgroundContainer = document.querySelector(
      ".background-container"
    );
    backgroundContainer.innerHTML = "";
    backgroundContainer.style.background = "none";
    backgroundContainer.style.height = "100px";
  },
  render(movie) {
    const backgroundContainer = document.querySelector(
      ".background-container"
    );
    backgroundContainer.innerHTML = /*html*/
    `
            <div class="top-rated-movie">
                <div class="rate">
                  <img src="${starImg}" class="star" />
                  <span class="rate-value">${(movie.vote_average ?? 0).toFixed(1)}</span>
                </div>
                <div class="title">${movie.title}</div>
                <button class="primary detail">자세히 보기</button>
                </div>
            </div>
            ${this.renderImage()}
      `;
    backgroundContainer.style.background = `url(${BACKDROP_IMAGE_URL}${movie.backdrop_path}) no-repeat center center / cover`;
    backgroundContainer.style.removeProperty("height");
  },
  renderSearch() {
    const backgroundContainer = document.querySelector(
      ".background-container"
    );
    backgroundContainer.innerHTML = /*html*/
    `${this.renderImage()}`;
  },
  clearSearchInput() {
    const searchInput = document.querySelector(
      ".search-input"
    );
    if (searchInput) searchInput.value = "";
  },
  getSearchInputValue() {
    const searchInput = document.querySelector(
      ".search-input"
    );
    return searchInput ? searchInput.value.trim() : "";
  },
  renderImage() {
    return (
      /*html*/
      `<div class="overlay" aria-hidden="true">
                <div class="search-container">
                <h1 class="logo">
                    <img src="${logo}" alt="MovieList" />
                </h1>
                <form class="search-form">
                    <input
                    type="search"
                    class="search-input"
                    placeholder="검색어를 입력하세요"
                    />
                    <button type="submit" class="btn-submit">
                        <img
                            src="${searchIcon}"
                            alt="search"
                            class="img-search"
                        />
                     </button>
                 </form>
                </div>
            </div>`
    );
  }
};
class MovieCard {
  movie;
  constructor(movie) {
    this.movie = movie;
  }
  render() {
    const li = document.createElement("li");
    li.className = "movie-card";
    li.dataset.id = this.movie.id.toString();
    li.innerHTML = `<div class="item">
      <img
         class="thumbnail"
         src="${THUMB_NAIL_URL}${this.movie.poster_path}"
         alt="${this.movie.title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="${starImg}" class="star" />
            <span>${(this.movie.vote_average ?? 0).toFixed(1)}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;
    return li;
  }
}
class MovieSkeleton {
  render() {
    const li = document.createElement("li");
    li.innerHTML = `<div class="movie-skeleton">
      <div class="movie-skeleton__poster"></div>
      <div class="movie-skeleton__details">
       <div class="movie-skeleton__title"></div>
       <div class="movie-skeleton__info"></div>
      </div>
    </div>
    `;
    return li;
  }
}
const noSearchImg = "/javascript-movie-review/assets/Nosearch-9C2OvmM-.png";
class MovieList {
  movieList;
  movieContainer;
  constructor() {
    this.movieList = document.querySelector(".thumbnail-list");
    this.movieContainer = document.querySelector(".main-result");
  }
  renderMainTitle(title) {
    const mainTitle = document.querySelector(".main-title");
    if (mainTitle) mainTitle.textContent = title;
  }
  showEmpty() {
    this.movieContainer.innerHTML = `
      <div class="result-none">
        <img src="${noSearchImg}" alt="검색 결과 없음" class="result-none-image" />
        <p class="result-none-text">검색 결과가 없습니다.</p>
      </div>
    `;
  }
  clearList() {
    this.movieList.innerHTML = "";
    this.movieContainer.innerHTML = "";
  }
  renderSkeleton() {
    this.clearList();
    for (let i = 0; i < 20; i++) {
      this.movieList?.append(new MovieSkeleton().render());
    }
  }
  appendSkeletons(count = 20) {
    for (let i = 0; i < count; i++) {
      const skeleton = new MovieSkeleton().render();
      skeleton.classList.add("skeleton-item");
      this.movieList?.append(skeleton);
    }
  }
  removeSkeletons() {
    this.movieList?.querySelectorAll(".skeleton-item").forEach((el) => el.remove());
  }
  renderMovieList(movies) {
    movies.results.forEach((movie) => {
      this.movieList?.append(new MovieCard(movie).render());
    });
  }
  renderError(message) {
    this.clearList();
    this.movieContainer.innerHTML = `
      <div class="result-none">
        <p class="result-none-text">${message}</p>
      </div>
    `;
  }
}
const star_score = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이예요",
  8: "재미있어요",
  10: "명작이예요"
};
class MovieDetailModal {
  div = document.createElement("div");
  reset() {
    this.div.innerHTML = "";
    this.div.classList.remove("active");
  }
  render(data) {
    this.div.className = "modal-background";
    this.div.innerHTML = /*html*/
    `
    <div class="modal">
        <div class="modal-container">
            <img class="modal-image" src="${THUMB_NAIL_URL}${data.poster_path}" alt="${data.title}">
            <div class="modal-description">
                <button class="close-modal">
                    <img src="./src/images/modal_button_close.png" alt="닫기">
                </button>
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-release-date-and-genres">${data.release_date.slice(0, 4)} · ${data.genres.map((genre) => genre.name).join(", ")}</p>
                <div class="average">
                    <p class="modal-rating-text">평균</p>
                    <img class="average-star" src="./src/images/star_filled.png">
                    <p class="modal-rating">${data.vote_average.toFixed(1)}</p>
                </div>
                <hr>
                <div class="modal-user-rating">
                  <p class="modal-user-rating-text">내 별점</p>
                  <div class="star-rating">
                    <div class="stars-row">
                      ${[1, 2, 3, 4, 5].map((i) => `<img class="modal-star" data-index="${i}" src="./src/images/star_empty.png">`).join("")}
                    </div>
                    <div class="rating-text">
                      <span class="rating-label"></span>
                      <span class="rating-score"></span>
                    </div>
                  </div>
                </div>
                <hr>
                <p class="modal-overview-title">줄거리</p>
                <p class="modal-overview">${data.overview}</p>
            </div>
        </div>
    </div>`;
    document.body.appendChild(this.div);
    this.div.classList.add("active");
    this.div.querySelector(".close-modal").addEventListener("click", () => this.close());
    this.#initStarRating(data.id);
  }
  #initStarRating(movieId) {
    const stars = this.div.querySelectorAll(".modal-star");
    const labelEl = this.div.querySelector(".rating-label");
    const scoreEl = this.div.querySelector(".rating-score");
    const saved = localStorage.getItem(`rating-${movieId}`);
    if (saved) this.#updateStars(stars, labelEl, scoreEl, Number(saved));
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const index = Number(star.dataset.index);
        this.#updateStars(stars, labelEl, scoreEl, index);
        localStorage.setItem(`rating-${movieId}`, String(index));
      });
    });
  }
  #updateStars(stars, labelEl, scoreEl, index) {
    stars.forEach((star, i) => {
      if (i < index) {
        star.src = "./src/images/star_filled.png";
      } else {
        star.src = "./src/images/star_empty.png";
      }
    });
    const score = index * 2;
    labelEl.textContent = star_score[score];
    scoreEl.textContent = `(${score}/10)`;
  }
  close() {
    this.div.classList.remove("active");
  }
}
async function fetchApi(path, page, query = "") {
  const queryString = query ? `&query=${encodeURIComponent(query)}` : "";
  const response = await fetch(
    `${BASE_URL}/${path}?api_key=${API_KEY}${queryString}&language=ko-KR&page=${page}`
  );
  if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
  return response.json();
}
async function getPopularMovies(page) {
  try {
    return await fetchApi(POPULAR_PATH, page);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
async function getSearchMovies(page, searchQuery) {
  try {
    return await fetchApi(SEARCH_PATH, page, searchQuery);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
async function getMoreMovies(page, searchQuery) {
  try {
    return searchQuery ? await fetchApi(SEARCH_PATH, page, searchQuery) : await fetchApi(POPULAR_PATH, page);
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
async function getMovieDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
    if (!response.ok) throw new Error(`API 요청 실패: ${response.status}`);
    return response.json();
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
const movieState = {
  page: 1,
  searchQuery: "",
  isLoading: false,
  hasMore: true,
  reset() {
    this.page = 1;
    this.searchQuery = "";
    this.isLoading = false;
    this.hasMore = true;
  }
};
const movieList = new MovieList();
const movieDetailModal = new MovieDetailModal();
async function initialRender(page) {
  try {
    Header.clearSearchInput();
    movieList.renderMainTitle("지금 인기 있는 영화");
    movieList.renderSkeleton();
    const data = await getPopularMovies(page);
    Header.clearHeader();
    Header.render(data.results[0]);
    movieList.clearList();
    movieList.renderMovieList(data);
    movieState.hasMore = page < data.total_pages;
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
async function renderSearchResults(page, searchQuery) {
  try {
    movieList.renderSkeleton();
    movieList.renderMainTitle(`"${searchQuery}" 검색 결과`);
    const data = await getSearchMovies(page, searchQuery);
    Header.clearHeader();
    Header.renderSearch();
    if (data.results.length === 0) {
      movieList.showEmpty();
      movieState.hasMore = false;
    } else {
      movieList.clearList();
      movieList.renderMovieList(data);
      movieState.hasMore = page < data.total_pages;
    }
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
async function renderMoreMovies(page, searchQuery) {
  movieState.isLoading = true;
  movieList.appendSkeletons(20);
  try {
    const data = await getMoreMovies(page, searchQuery);
    movieList.removeSkeletons();
    movieList.renderMovieList(data);
    movieState.hasMore = page < data.total_pages;
  } catch (error) {
    movieList.removeSkeletons();
    if (error instanceof Error) movieList.renderError(error.message);
  } finally {
    movieState.isLoading = false;
  }
}
async function renderMovieDetailModal(id) {
  try {
    movieDetailModal.reset();
    const data = await getMovieDetail(id);
    movieDetailModal.render(data);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
function closeMovieDetailModal() {
  movieDetailModal.close();
}
function initEvents() {
  loadHeader();
  loadSearch();
  loadInfiniteScroll();
  loadMovieDetailInfo();
}
function loadHeader() {
  const header = document.querySelector(".header");
  header.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page);
    }
  });
}
function loadSearch() {
  const submitContainer = document.querySelector(
    ".background-container"
  );
  submitContainer.addEventListener("submit", async (e) => {
    e.preventDefault();
    movieState.page = 1;
    movieState.searchQuery = Header.getSearchInputValue();
    if (movieState.searchQuery === "") {
      await initialRender(movieState.page);
      return;
    }
    await renderSearchResults(movieState.page, movieState.searchQuery);
  });
}
function loadInfiniteScroll() {
  const sentinel = document.querySelector(".scroll-sentinel");
  if (!sentinel) return;
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !movieState.isLoading && movieState.hasMore) {
        movieState.page += 1;
        renderMoreMovies(movieState.page, movieState.searchQuery);
      }
      if (!movieState.hasMore) observer.disconnect();
    },
    { rootMargin: "200px" }
  );
  observer.observe(sentinel);
}
function loadMovieDetailInfo() {
  const movieList2 = document.querySelector(".thumbnail-list");
  if (movieList2) {
    movieList2.addEventListener("click", async (e) => {
      const target = e.target;
      const card = target.closest(".movie-card");
      if (card) {
        const id = card.dataset.id;
        if (id) await renderMovieDetailModal(Number(id));
      }
    });
  }
  document.body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".close-modal") || target.classList.contains("modal-background")) {
      closeMovieDetailModal();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMovieDetailModal();
    }
  });
}
addEventListener("load", async () => {
  await initialRender(movieState.page);
  initEvents();
});
