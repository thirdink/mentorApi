import HTTPStatus from 'http-status';
import Profile from './profile.model';


export async function createProfile(req,res){
    try{
        const profile = await Profile.createProfile(req.body,req.user._id);
        return res.status(HTTPStatus.CREATED).json(profile);
    }catch(e){
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}

export async function getProfileList(req,res){
    const limit = parseInt(req.query.limit,0);
    const skip = parseInt(req.queery.skip,0);

    try{
        const profile = await Profile.list({ limit,skip });
        return res.status(HTTPStatus.OK).json(profile);
    } catch(e){
        return res.status(HTTPStatus.BAD_REQUEST).json(e);
    }
}
