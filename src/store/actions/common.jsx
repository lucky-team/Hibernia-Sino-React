import CommonTpyes from 'store/actions/CommonTypes';

export const clearError = () => (dispatch) => {
    return {
        type: CommonTypes.CLEAR_ERROR
    }
}