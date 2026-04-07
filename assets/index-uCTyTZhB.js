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
    li.innerHTML = `<div class="item">
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
  updateMoreButton(totalPages, currentPage) {
    const moreButton = document.querySelector(".btn-more");
    if (!moreButton) return;
    moreButton.style.display = totalPages === currentPage ? "none" : "block";
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
const movieList = new MovieList();
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
    movieList.updateMoreButton(data.total_pages, page);
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
    } else {
      movieList.clearList();
      movieList.renderMovieList(data);
    }
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
async function renderMoreMovies(page, searchQuery) {
  try {
    const data = await getMoreMovies(page, searchQuery);
    movieList.renderMovieList(data);
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}
const movieState = {
  page: 1,
  searchQuery: "",
  reset() {
    this.page = 1;
    this.searchQuery = "";
  }
};
function initEvents() {
  const header = document.querySelector(".header");
  header.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.closest(".logo")) {
      movieState.reset();
      await initialRender(movieState.page);
    }
  });
  const submitContainer = document.querySelector(".background-container");
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
  const moreButton = document.querySelector(".btn-more");
  if (moreButton) {
    moreButton.addEventListener("click", async () => {
      movieState.page += 1;
      await renderMoreMovies(movieState.page, movieState.searchQuery);
    });
  }
}
addEventListener("load", async () => {
  await initialRender(movieState.page);
  initEvents();
});
