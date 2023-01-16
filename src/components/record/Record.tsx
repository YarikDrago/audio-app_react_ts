import React, {Fragment, useEffect, useRef, useState} from 'react';
import styled from "styled-components";

const RecordContainer = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  padding: 0;
  gap: 10px;
  background-color: #ffffa3;
`

const PlayBtn = styled.button`
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  :hover{
    .audio-dark{
      opacity: 1;
    }
  }
`

const PlayBtnImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
`

const PlayBtnImgHovered = styled(PlayBtnImg)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`

const Container = styled.div`
  position: relative;
  display: block;
  width: 65px;
  height: 24px;
`

const Mask = styled.div<{percentage : number}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.percentage * 100}%;
  height: 100%;
  overflow: hidden;
`

interface IRecord{
    trackPath: string
}

const Record = ({trackPath}: IRecord) => {
    const refAudio = useRef(null)
    const [playStatus, setPlayStatus] = useState(false)
    let audio = new Audio()
    const [trackDuration, setTrackDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [percentage, setPercentage] = useState(0)

    useEffect(()=>{
        if (refAudio.current !== null){
            audio = refAudio.current as HTMLAudioElement
            audio.onloadedmetadata = () =>{
                setTrackDuration(audio.duration)
            }
        }
    },[])

    function audioPlay(audio : HTMLAudioElement){
        if (playStatus) audio.pause()
        else audio.play()
        requestAnimationFrame(anime)

        function anime(){
            setPercentage(audio.currentTime/trackDuration)
            setCurrentTime(audio.currentTime)
            if (audio.currentTime/trackDuration < 1 && !audio.paused){
                requestAnimationFrame(anime)
            }
        }
    }

    return (
        <RecordContainer>
            <audio
                id="audio"
                ref={refAudio}
            >
                <source src={require('@/' + trackPath).default} type={'audio/mpeg'}/>
                Your browser does not support the <code>audio</code> element.
            </audio>
            <PlayBtn
                onClick={()=>{
                    if (refAudio.current !== null){
                        audio = refAudio.current as HTMLAudioElement
                        audioPlay(audio)
                        audio.addEventListener('ended', ()=>{
                            setPlayStatus(false)
                        })
                        setPlayStatus(!playStatus)
                    }
                }}
            >
                {playStatus && <Fragment>
                    <PlayBtnImg src={require('@/assets/images/audio_pause_img.png').default}/>
                    <PlayBtnImgHovered
                        className={'audio-dark'}
                        src={require('@/assets/images/audio_pause_dark_img.png').default}
                    />
                </Fragment>
                }
                {!playStatus && <Fragment>
                    <PlayBtnImg src={require('@/assets/images/audio_play_img.png').default}/>
                    <PlayBtnImgHovered
                        className={'audio-dark'}
                        src={require('@/assets/images/audio_play_dark_img.png').default
                        }/>
                </Fragment>}
            </PlayBtn>
            <Container>
                <img src={require('@/assets/images/audio_track_img.png').default} alt=""/>
                <Mask percentage = {percentage}>
                    <img src={require('@/assets/images/audio_track_blue_img.png').default} alt=""/>
                </Mask>
            </Container>
            <p>{`${(""+Math.trunc(currentTime / 60)).padStart(2, '0')}:
                ${(""+Math.round(currentTime % 60)).padStart(2, '0')}/
                ${(""+Math.trunc(trackDuration / 60)).padStart(2, '0')}:
                ${(""+Math.round(trackDuration % 60)).padStart(2, '0')}`}</p>
        </RecordContainer>
    );
};

export default Record;