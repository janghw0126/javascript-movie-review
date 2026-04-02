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
const BACKDROP_IMAGE_URL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";
const THUMB_NAIL_URL = "https://media.themoviedb.org/t/p/w200";
const API_KEY = void 0;
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_PATH = "movie/popular";
const SEARCH_PATH = "search/movie";
const starImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ4SURBVHgB7VlNctMwFP7UwrRl0/YGzgloNwyURd0TQE5AeoK2J2hyAuAEaU9QOEHMgvCzSW9QcwLChqbDNOI9RVEk106sWGZY5JvR+FlRJD29fxlYYYX/F/I79uQXxKgRAjWANh3Ro0ct0l0ptSPxQj2DYg31oIvZ5qHpLmpAcAno07+ZdWBIq+zoN5ZCgoCoQwLnhhK4oBUS8y7xGoFRhwT49CP9eqSfPb3aEBtoiH16BkJQCdDmW7AMl9VFq0w6GUCqdKvGBENoFXpj0R2LvjSUwCsERDAGtPHGVldiqBHeWf0xxwcEQkgJOMZr+3xxpHQ+Mb//CWfMIRmIDSUtlZlhplLrOJED41orIQgDecabHaP6pPY+E2OOEQChJFBkvC4E3lv0CQIgNw4o8Y6UiCNicQdjanxqQrVtQ0s9xk0bGkU5j+zR+E38tFa/1pF6aD1/GXrqfteJfkySzYkfImfjV8CS4mXjfY7jeUNkn+YXSxvxBR3Amc3II+fnEd4CS+tmQlH2bOGoO2JwC8umFS3aI8MckiuBPol3lnilqs3EyfjxQORjak/yxTsPStq/tYraKikMvY2pak769/SOhyTl3ek8j+aswb68g5qgGb4uM1Z+oxgzzg9+rheyvQTQll9xFcpfLwNeW9nMGG2r+4M9xmWAQ760BrCejjDQacI/hVqT1nYMXtDeMnYmCv7chp0asC2soymelRN5VcjPpC5ryhtGpnOMjnjpSEIhN5CR7reJNZvTCPckiT5OUTNIbU9oVwPYm5fkOnM2z5hb0OSeBNlGXcatjbVtdaX03qTNF0p+YUWWc8Mw1cXjUJWVchS3VPS7+s5RurnoJqNUSalSgI3MAnw6m9ivyoSO/lmVuaRgd1pm7lLJHOfz4gBNuIlaFKQ8HKlDicw7G+sBWmUPxisbVcYtrVixhqeojtiiO0XGWgT/dFqoED+BpNSiOlJrPu+g6c+AdEJ6gupIDLVEwe91L5S9dSOVqnyvpB3EjUkiN7Hr4xj8JBD+9CcFv7D8/MgvzfZjwBXxp0XDPa7XZ3NJvysXXxuILTopGsSbppRgwOkHvfb4unFBQpgYytMOSuuwo/+ZosKM4aB0R+mALMiZJGW7lLLnRddMMdUo+y3BRwKxtZEHuYlSFY6o9ualrtymEOq3nr6GcSGcOWOUhA8Dh5ht7KMhSTLUOFdy8yVWC4F91eBcdPGYLv2n66iVNSf95xAlsZwE9Gmp1FcqPY+tjQxpVk7C1Ccl3VqYFOKpNR/39UyKbktAlpeAjw1I65Xv/c+RFTWnGVuUbhf4cX3ibbgXYYxUzSlVBeZlBz4M9FCsmym147Kfj9Tt9P2DOiOLUgz4qFCnsJ/Tao9vX1ya0vjGnDnTsl7IL5XoU5Sc3GlGyhNR2Vn106lSK6lu66YBLEVNn2RrBZevqoRdYYUVvPAXJrOCc9SFL6sAAAAASUVORK5CYII=";
class MovieCard {
  movie;
  constructor(movie) {
    this.movie = movie;
  }
  render() {
    return `<div class="item">
      <img
         class="thumbnail"
         src="${THUMB_NAIL_URL}${this.movie.poster_path}"
         alt="${this.movie.title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="${starImg}" class="star" />
            <span>${this.movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${this.movie.title}</strong>
        </div>
      </div>
    `;
  }
}
class MovieSkeleton {
  render() {
    return `<div class="movie-skeleton">
      <div class="movie-skeleton__poster"></div>
      <div class="movie-skeleton__details">
       <div class="movie-skeleton__title"></div>
       <div class="movie-skeleton__info"></div>
      </div>
    </div>
    `;
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
      const li = document.createElement("li");
      const skeleton = new MovieSkeleton();
      li.innerHTML = skeleton.render();
      this.movieList?.append(li);
    }
  }
  renderMovieList(movies) {
    movies.results.forEach((movie) => {
      const li = document.createElement("li");
      const movieCard = new MovieCard(movie);
      li.innerHTML = movieCard.render();
      this.movieList?.append(li);
    });
  }
}
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAUCAYAAACtZULwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUdSURBVHgB7VrhcRsrEP6cyX+rBFyBlQpMKrBeBZYreHYFUip4cgVSKkhSgXgVRKlApAKrAx77AA+3t3CcpHGcmXwzjO5gF5Zd2GU5XTjnlgDsxcXFxj9r/0xl5csDulh5mgOrQ+Qfgsj72vCyOl7n5brAifDdKv+zZ9Ub3/V9ZWzS+RVeEy7g2ZetL/v4rlwfWuCdujYovAFIguEMKOhrPTD2HmdElEHnhdO8z56VL5NKf1NfjFD3B28DS1/usnfrS8dzJGPvvEv56IJLXhQ6uxbqfjdjf8KvAx/71cNaMraKhr6p0GqhrkZfhR+PvIhC36NYXw5+8e0E+o7n8TS20rdEu0G7bNMoW8Ihlt2R548Nez8UxlWQvaxFXS+XQn+qM54rxFgX4jjHhHXWi0Ol/jIeivNbN4y9L4uM70GgmUOAr18LtBPXl2/P+HSjbN99meVKFWh4zN6z9m1usCjzc8PYe9fVy9y1Yfsu8hgE//6UyWcFPU5zxQjtO1TggtFpkhrDINplphQj0JQ8i2bvZmg3urBwWmUjPXzJDX4iaGHMUT8zJSgEvTxgJJKxk/vIXcG/Av208FzjybFG24Ry0G6bRffFDdZTtqfl7pfwGcNYYDz+wYlwwVses2j+xkgkY5OCaFXPszZpl14XnhMsCoi7WgtN5E3uY3ks9HEbf7+x+onrp3Va4DeoIHopxaqtLx8RPB6VD+jLptzpaaW0aWw2bhqb20PF3wPKerdZeYnZFINoB23iO01CyqFfYlzkyfHs5NiV+tNC/VcuXaGPfWyT4tMD49+y9u9Z235Ev0tBtqVAN3cnxGwn62UrjL0R6NTQ3HK8Z6vgOb2Q2/QMtGpyt0uTmsT4x1dkNV6jv3NEHjo1u/5dR5KBFseatWmEG7/kEjVrb3HhSqi79f3dNNCdCklvOhqL2n4geKZlLC8oZSMlJGOT4fYFQTSrmzr54ukHzgeLrmL/NzYtMj+2YTLlBtFCXwbHofUOQeEExDnRgrwT+qVC8TydJ8geFPbMWEMTUsy2CEm/Ye2SAaeQFWFQx9iDWQn8EEhxO8lzy9osz0vfIryMcwT92wFSmid5tq2Ts6Eq0s4mpSxjnNJZe+mQJhnOoo4DzgOD/slZQ/ZCBqeNYxvozrKYSP8IKZVGmAd5LDKupGuFkPpdjbngScZOMYJ3bAQeLdQdYoxXGIfSble8//TgxzHCWeI2unfO1xKvO/1n+ObHWqEB7oQTeeRVrHoVjZ9SSSoL9EMbufgNGpGMnY7vCpkS42Gpd0gT+mlZ3RJN71LEyRcVnNegm5uSMjSjoQVo0IZDQbYVk+0L+jnxX5DnNvP0PxHiq0EZS/Tj9VWSKYahtJG4R6uFRhUzgp+pouVDiOQeOVoOZxZhArmA0+hRbHxPd9JD/VPczpVOfAuBphVGqJsxZV1CvvxId+YcuUwGZVihbu3H5vLfQR47geykWPu88xZzst737Kx95YYxi7TFPDu2L91xUExm1cAzZxOv5qKu7U7cVfhL99rLwti1PLsVOht/ULfvMl0oyG7hWBctYYXxB5pPPM2I73aA7yvG4R5tB7Icj9nzE45AdPHH8H5m4YF0a2sM5MaJgdz4owu7gdxF7h4M6m7owIwh0ab4Q78f4jiUJikUPnEiuOFNJXV6Qj/VSih9htyhq5CX53g+oWtJ8lJ3mWxokS1mM9R+w/hsYeycl77opXB5DXnjpXBhaHz6G1neGOd75YKXpX4umRz4Dz1my31xwGpxAAAAAElFTkSuQmCC";
const searchIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAALZJREFUeAGtkQENwzAMBK0hCIMFQiAUwiAUQhm0TDoGgVAIg5Ax6Bhk3vaVflUcRVVfekWK7XPsiJypnLNTj+qUf1rVUR1aigMKLI21Yk9dF3VH9xNBBgswIyEa8WEbyQI8kGDOSi8MpeBXUpGG70jr+f6C84UkV2FccT5L9AX0ScrdPS3SlRI6a9P43oTYLJZ23/UpiPQyvvc1SE/dNq2ApyYIjXSDHe2hHWKA/yByRAQ5BtjrDXDaZj4YxEyHAAAAAElFTkSuQmCC";
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
                  <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
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
const movieListInstance$2 = new MovieList();
function handleHeaderSearch() {
  Header.clearHeader();
  Header.renderSearch();
}
function handleHeader(movie) {
  Header.clearHeader();
  Header.render(movie);
}
function handleMovieList(data) {
  movieListInstance$2.clearList();
  movieListInstance$2.renderMovieList(data);
}
async function fetchMoviesApi(path, page2, params = "") {
  const queryUrl = params === "" ? "" : `&query=${encodeURIComponent(params)}`;
  const response = await fetch(
    `${BASE_URL}/${path}?api_key=${API_KEY}${queryUrl}&language=ko-KR&page=${page2}`
  );
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
const movieListInstance$1 = new MovieList();
async function fetchApi(page2, searchMovie2) {
  if (searchMovie2) {
    return await fetchMoviesApi(SEARCH_PATH, page2, searchMovie2);
  }
  return await fetchMoviesApi(POPULAR_PATH, page2, searchMovie2);
}
async function handleMoreMovie(page2, searchMovie2) {
  try {
    const data = await fetchApi(
      page2,
      searchMovie2
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
async function handleMovie(page2) {
  try {
    movieListInstance$1.renderSkeleton();
    const data = await fetchApi(
      page2
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
async function handleSearchMovie(page2, searchMovie2) {
  try {
    movieListInstance$1.renderSkeleton();
    const data = await fetchApi(
      page2,
      searchMovie2
    );
    return data;
  } catch (error) {
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
}
const movieListInstance = new MovieList();
async function initialRender(page2, moreButton2, updateMoreButton2) {
  const mainTitle = document.querySelector(".main-title");
  mainTitle.textContent = "지금 인기 있는 영화";
  const data = await handleMovie(page2);
  handleHeader(data.results[0]);
  handleMovieList(data);
  updateMoreButton2(moreButton2, data);
}
async function searchRender(page2, searchMovie2, moreButton2, updateMoreButton2) {
  const mainTitle = document.querySelector(".main-title");
  mainTitle.textContent = `"${searchMovie2}" 검색 결과`;
  const data = await handleSearchMovie(page2, searchMovie2);
  handleHeaderSearch();
  if (data.results.length === 0) {
    movieListInstance.showEmpty();
  } else {
    handleMovieList(data);
  }
  updateMoreButton2(moreButton2, data);
}
async function moreRender(page2, searchMovie2, moreButton2, updateMoreButton2) {
  const data = await handleMoreMovie(page2, searchMovie2);
  movieListInstance.renderMovieList(data);
  updateMoreButton2(moreButton2, data);
}
let page = 1;
let searchMovie = "";
const moreButton = document.querySelector(".btn-more");
addEventListener("load", async () => {
  await initialRender(page, moreButton, updateMoreButton);
  const submitContainer = document.querySelector(
    ".background-container"
  );
  submitContainer.addEventListener("submit", async (e) => {
    e.preventDefault();
    page = 1;
    const searchInput = document.querySelector(
      ".search-input"
    );
    searchMovie = searchInput.value.trim();
    if (searchMovie === "") {
      await initialRender(page, moreButton, updateMoreButton);
      return;
    }
    await searchRender(page, searchMovie, moreButton, updateMoreButton);
    attachLogoListener();
  });
  attachLogoListener();
});
function attachLogoListener() {
  const logo2 = document.querySelector(".logo");
  logo2.addEventListener("click", async () => {
    page = 1;
    searchMovie = "";
    await initialRender(page, moreButton, updateMoreButton);
    attachLogoListener();
  });
}
moreButton.addEventListener("click", async () => {
  page += 1;
  await moreRender(page, searchMovie, moreButton, updateMoreButton);
});
function updateMoreButton(moreButton2, data) {
  if (data.total_pages === page) {
    moreButton2.style.display = "none";
  } else {
    moreButton2.style.display = "block";
  }
}
