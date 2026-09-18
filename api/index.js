import charactersDump from './data/characters.json' with { type: 'json' };
import episodesDump from './data/episodes.json' with { type: 'json' };
import deathsDump from './data/deaths.json' with { type: 'json' };
import quotesDump from './data/quotes.json' with { type: 'json' };

const data = { characters: charactersDump, episodes: episodesDump, deaths: deathsDump, quotes: quotesDump };
const text = (value) => String(value ?? '').toLowerCase();
const contains = (value, query) => text(value).includes(text(query));
const asArray = (value) => (Array.isArray(value) ? value : value ? String(value).split(',').map((item) => item.trim()) : []);
const paginate = (items, query) => {
  const offset = Math.max(Number.parseInt(query.offset, 10) || 0, 0);
  const limit = Number.parseInt(query.limit, 10);
  return Number.isFinite(limit) && limit >= 0 ? items.slice(offset, offset + limit) : items.slice(offset);
};
const withIds = (items) => items.map((item, index) => ({ id: index + 1, ...item }));

const characters = () => withIds(data.characters).map((character) => ({
  ...character,
  birthday: character.birth_date || 'Unknown',
  img: character.image_url || null,
  status: character.status || 'Unknown',
  nickname: character.nickname || 'Unknown',
  category: character.category || character.series || 'Breaking Bad',
  occupation: asArray(character.occupation),
  appearance: asArray(character.appearances),
  better_call_saul_appearance: character.series === 'Better Call Saul' ? asArray(character.appearances) : [],
}));
const episodes = () => withIds(data.episodes).map((episode) => ({ ...episode, characters: asArray(episode.characters) }));
const deaths = () => withIds(data.deaths).map((death) => ({ ...death, number_of_deaths: death.number_of_deaths == null ? 1 : death.number_of_deaths }));
const quotes = () => withIds(data.quotes);
const random = (items, count = 1) => [...items].sort(() => Math.random() - 0.5).slice(0, Math.max(Number.parseInt(count, 10) || 1, 1));
const getPath = (req) => new URL(req.url || '/', 'http://localhost').pathname.replace(/^\/api\/?/, '').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
const send = (res, status, payload) => res.status(status).json(payload);

function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { error: 'Method not allowed' }); }
  const path = getPath(req);
  const queryObject = Object.fromEntries(new URL(req.url || '/', 'http://localhost').searchParams.entries());
  const [resource, identifier] = path;
  const allCharacters = characters();
  const allEpisodes = episodes();
  const allQuotes = quotes();
  const allDeaths = deaths();

  if (!resource) return send(res, 200, { characters: '/api/characters', episodes: '/api/episodes', quotes: '/api/quotes', deaths: '/api/deaths' });
  if (resource === 'characters') {
    if (identifier) { const result = allCharacters.filter((item) => String(item.id) === identifier); return send(res, result.length ? 200 : 404, result.length ? result : { error: 'Character not found' }); }
    let result = allCharacters;
    if (queryObject.name) result = result.filter((item) => contains(item.name, queryObject.name));
    if (queryObject.category) result = result.filter((item) => contains(item.category, queryObject.category));
    return send(res, 200, paginate(result, queryObject));
  }
  if (resource === 'character' && identifier === 'random') return send(res, 200, random(allCharacters, queryObject.limit));
  if (resource === 'home-page-characters' || resource === 'footer-char-info') {
    let result = allCharacters;
    if (queryObject.category) result = result.filter((item) => contains(item.category, queryObject.category));
    return send(res, 200, random(paginate(result, queryObject), queryObject.limit));
  }
  if (resource === 'episodes') {
    if (identifier) { const result = allEpisodes.filter((item) => String(item.id) === identifier || String(item.episode_id) === identifier); return send(res, result.length ? 200 : 404, result.length ? result : { error: 'Episode not found' }); }
    const result = queryObject.series ? allEpisodes.filter((item) => contains(item.series, queryObject.series)) : allEpisodes;
    return send(res, 200, paginate(result, queryObject));
  }
  if (resource === 'quotes') {
    if (identifier) { const result = allQuotes.filter((item) => String(item.id) === identifier); return send(res, result.length ? 200 : 404, result.length ? result : { error: 'Quote not found' }); }
    const result = queryObject.series ? allQuotes.filter((item) => contains(item.series, queryObject.series)) : allQuotes;
    return send(res, 200, paginate(result, queryObject));
  }
  if (resource === 'quote' && identifier === 'random') return send(res, 200, random(queryObject.author ? allQuotes.filter((item) => contains(item.author, queryObject.author)) : allQuotes));
  if (resource === 'quote' && !identifier) return send(res, 200, queryObject.author ? allQuotes.filter((item) => contains(item.author, queryObject.author)) : allQuotes);
  if (resource === 'deaths') return send(res, 200, paginate(allDeaths, queryObject));
  if (resource === 'random-death') return send(res, 200, random(allDeaths)[0]);
  if (resource === 'death-count') { const matching = queryObject.name ? allDeaths.filter((item) => contains(item.responsible, queryObject.name)) : allDeaths; return send(res, 200, [{ name: queryObject.name, deathCount: matching.reduce((total, item) => total + Number(item.number_of_deaths || 1), 0) }]); }
  if (resource === 'death') return send(res, 200, queryObject.name ? allDeaths.filter((item) => contains(item.death, queryObject.name) || contains(item.responsible, queryObject.name)) : allDeaths);
  if (resource === 'complete') return send(res, 200, [...allCharacters, ...allEpisodes, ...allQuotes, ...allDeaths]);
  return send(res, 404, { error: 'Not found' });
}

export { data };
export default handler;
