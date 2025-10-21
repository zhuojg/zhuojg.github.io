import { AppsIcon, ChevronDownIcon, LogIcon, MarkGithubIcon } from '@primer/octicons-react'
import { FC } from 'react'
import { Project } from '../types/project'
import { ProjectCard } from './projectCard'

const projects: Project[] = [
  {
    Icon: () => <AppsIcon size={18} />,
    name: 'Suprematics.AI',
    link: 'https://suprematics.ai',
    date: 'Oct, 2025',
    introduction: 'From Concept to Viral, In Just One Sentence',
  },
  {
    Icon: () => <AppsIcon size={18} />,
    name: 'GenDAM',
    link: 'https://gendam.ai',
    date: 'May, 2024',
    introduction:
      'Privacy first generative DAM.\n A cross-platform desktop application for managing, processing, and searching multimedia content using Rust-based libraries and AI models.',
  },
  {
    Icon: () => <AppsIcon size={18} />,
    name: 'MuseAI',
    link: 'https://museai.cc',
    date: 'Jul, 2023',
    introduction: 'AIGC Playground',
  },
  {
    Icon: () => <AppsIcon size={18} />,
    name: 'MyMfers',
    link: 'https://mymfers.xyz',
    date: 'Sept, 2022',
    introduction: 'Mix and match to claim your mfers',
  },
  {
    Icon: () => <MarkGithubIcon size={18} />,
    name: 'Subculture Colorization',
    link: 'https://github.com/tezignlab/subculture-colorization',
    date: 'Mar, 2021',
    introduction: 'Paper about colors in Chinese Youth Subculture',
  },
  {
    Icon: () => <LogIcon size={18} />,
    name: 'CalligraphyGAN',
    link: 'https://arxiv.org/abs/2012.00744',
    date: 'Dec, 2020',
    introduction: 'Paper about Chinese calligraphy generation with GAN',
  },
]

export const Projects: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-x-2 justify-center items-center mb-4">
        <ChevronDownIcon size={32} />
      </div>

      <div className="flex flex-col divide-y divide-dashed">
        {projects.map((item) => (
          <div key={item.name} className="py-4">
            <ProjectCard project={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
