import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { ASC } from 'app/shared/util/pagination.constants';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IParagraph, defaultValue } from 'app/shared/model/paragraph.model';

const initialState: EntityState<IParagraph> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'api/paragraphs';

// Actions
export const getEntitiesByPostId = createAsyncThunk(
  'paragraph/fetch_entities_by_post_id',
  async ({ postId, sort }: { postId: number; sort?: string }) => {
    const requestUrl = `${apiUrl}/by-post/${postId}?${sort ? `sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`;
    return axios.get<IParagraph[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntities = createAsyncThunk(
  'paragraph/fetch_entity_list',
  async ({ sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`;
    return axios.get<IParagraph[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntity = createAsyncThunk(
  'paragraph/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IParagraph>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'paragraph/create_entity',
  async ({ entity, postId }: { entity: IParagraph; postId: number }, thunkAPI) => {
    const result = await axios.post<IParagraph>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntitiesByPostId({ postId }));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'paragraph/update_entity',
  async (entity: IParagraph, thunkAPI) => {
    const result = await axios.put<IParagraph>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'paragraph/partial_update_entity',
  async (entity: IParagraph, thunkAPI) => {
    const result = await axios.patch<IParagraph>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'paragraph/delete_entity',
  async ({ id, postId }: { id: string | number; postId: number }, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IParagraph>(requestUrl);
    thunkAPI.dispatch(getEntitiesByPostId({ postId }));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const ParagraphSlice = createEntitySlice({
  name: 'paragraph',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      // .addMatcher(isFulfilled(getEntities), (state, action) => {
      .addMatcher(isFulfilled(getEntities, getEntitiesByPostId), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data.sort((a, b) => {
            if (!action.meta?.arg?.sort) {
              return 1;
            }
            const order = action.meta.arg.sort.split(',')[1];
            const predicate = action.meta.arg.sort.split(',')[0];
            return order === ASC ? (a[predicate] < b[predicate] ? -1 : 1) : b[predicate] < a[predicate] ? -1 : 1;
          }),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      // .addMatcher(isPending(getEntities, getEntity), state => {
      .addMatcher(isPending(getEntities, getEntity, getEntitiesByPostId), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ParagraphSlice.actions;

// Reducer
export default ParagraphSlice.reducer;
